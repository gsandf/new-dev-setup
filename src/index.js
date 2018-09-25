import axios from 'axios';
import execa from 'execa';
import os from 'os';
import signale, { Signale } from 'signale';

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
    { install: installN, name: 'n' },
    { install: installNode, name: 'node' }
  ];

  for (const requirement of requirements) {
    await installRequirement(requirement);
  }

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

  const installProcess = execa('ruby', ['-e', installScript]);
  installProcess.stdout.pipe(process.stdout);
  installProcess.stderr.pipe(process.stderr);
  await installProcess;
}

async function installN() {
  const installProcess = execa('brew', ['install', 'n']);
  installProcess.stdout.pipe(process.stdout);
  installProcess.stderr.pipe(process.stderr);
  await installProcess;
}

async function installNode() {
  const installProcess = execa('n', ['stable']);
  installProcess.stdout.pipe(process.stdout);
  installProcess.stderr.pipe(process.stderr);
  await installProcess;
}

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

main();
