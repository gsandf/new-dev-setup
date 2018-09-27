import axios from 'axios';
import execa from 'execa';
import inquirer from 'inquirer';
import os from 'os';
import signale, { Signale } from 'signale';

import execute from './execute';
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
    { install: brewInstall('n'), name: 'n' },
    { install: installNode, name: 'node' }
  ];

  // Run in series
  for (const requirement of requirements) {
    await installRequirement(requirement);
  }

  await promptInstallPackages(packageBundles);

  log.star("You're good to go!");
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

  return execute('ruby', ['-e', installScript]);
}

const installNode = async () => execute('n', ['stable']);

async function installRequirement({ name, install }) {
  log.await(`Checking for ${name}`);
  if (await foundInPath(name)) {
    log.success(`${name} found`);
    return;
  }

  log.await(`Installing ${name}`);
  await install();
  log.success(`Installed ${name}`);
}

async function promptInstallPackages(packageBundles) {
  const choices = Object.entries(packageBundles).reduce(
    (allChoices, [name, packages]) => [
      ...allChoices,
      new inquirer.Separator('\n' + name.toUpperCase()),
      ...packages
    ],
    []
  );

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
