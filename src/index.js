import axios from 'axios';
import execa from 'execa';
import inquirer from 'inquirer';
import os from 'os';
import signale, { Signale } from 'signale';

import { execute, executeShell } from './execute';
import * as packageBundles from './packages';
import { brewInstall } from './packages/installers';
import foundInPath from './foundInPath';

const log = new Signale({ interactive: true });

const die = msg => {
  signale.fatal(msg);
  process.exit(1);
};

async function main() {
  // Ensure running on macOS
  if (os.type() !== 'Darwin') die('This script was written for macOS');

  await installCLITools();

  const requirements = [
    { install: installHomebrew, name: 'brew' },
    { check: hasBrewCask, install: installHomebrewCask, name: 'brew-cask' },
    { force: true, install: setupN, name: 'n (folder setup)' },
    { install: brewInstall('n'), name: 'n' },
    { install: installNode, name: 'node' },
    { install: brewInstall('yarn', '--ignore-dependencies'), name: 'yarn' }
  ];

  // Run in series
  for (const requirement of requirements) {
    await installRequirement(requirement);
  }

  await promptInstallPackages(packageBundles);

  log.star("You're good to go!");
}

async function hasBrewCask() {
  try {
    await execa('brew', ['cask', 'help']);
    return true;
  } catch (e) {
    return false;
  }
}

async function installCLITools() {
  log.await('Checking for macOS command line tools');

  try {
    await execa('xcode-select', ['-p']);
    log.success('macOS command line tools found');
  } catch (e) {
    log.await('Installing for macOS command line tools');
    await execa('xcode-select', ['--install']);
    log.success('Installed macOS command line tools');
  }
}

async function installHomebrew() {
  const response = await axios.get(
    'https://raw.githubusercontent.com/Homebrew/install/master/install'
  );

  const installScript = response.data;

  await execute('ruby', ['-e', installScript]);

  return executeShell(`
    # Ensure folder for n exists
    [ -d /usr/local/n ] || {
      echo 'Creating folder for n at /usr/local/n'
      echo
      sudo mkdir /usr/local/n
    }

    # Ensure owner of n is the correct user
    if [[ "$(stat -f '%Su' /usr/local/n)" != "$(whoami)" ]]; then
      echo 'Setting '$(whoami)' as owner of /usr/local/n'
      echo
      sudo chown "$(whoami)" /usr/local/n
    fi
  `);
}

const installHomebrewCask = async () =>
  executeShell(`
    echo 'Adding Homebrew Cask (https://formulae.brew.sh/cask/): '
    brew tap caskroom/cask

    echo 'Checking for more cask versions: '
    if [[ ! "$(brew tap)" =~ 'caskroom/versions' ]]; then
      echo 'installing'
      brew tap caskroom/versions
    else
      echo 'already tapped'
    fi
  `);

const installNode = async () => execute('n', ['stable']);

const setupN = async () =>
  executeShell(`
    # Ensure folder for n exists
    [ -d /usr/local/n ] || {
      echo 'Creating folder for n at /usr/local/n'
      echo
      sudo mkdir /usr/local/n
    }

    # Ensure owner of n is the correct user
    if [[ "$(stat -f '%Su' /usr/local/n)" != "$(whoami)" ]]; then
      echo 'Setting '$(whoami)' as owner of /usr/local/n'
      echo
      sudo chown "$(whoami)" /usr/local/n
    fi
  `);

async function installRequirement({ check, force = false, name, install }) {
  if (!force) {
    log.await(`Checking for ${name}`);

    const exists = check == null ? await foundInPath(name) : await check(name);

    if (exists) {
      log.success(`${name} found`);
      return;
    }
  }

  log.await(`Installing ${name}`);
  await install();
  log.success(`Installed ${name}`);
}

async function promptInstallPackages(packageBundles) {
  const choices = (await Promise.all(
    Object.entries(packageBundles).flatMap(async ([name, packages]) => [
      new inquirer.Separator('\n' + name.toUpperCase()),
      ...(await packages())
    ])
  )).flatMap(section => section);

  const answers = await inquirer.prompt([
    {
      choices,
      message: 'Select extras to install',
      name: 'packages',
      pageSize: 50,
      type: 'checkbox'
    }
  ]);

  // Run in series
  for (const pkg of answers.packages) {
    await installRequirement(pkg);
  }
}

main();
