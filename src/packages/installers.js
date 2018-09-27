import { execute } from '../execute';

export const brewInstall = (...packages) => async () =>
  execute('brew', ['install', ...packages]);

export const brewCaskInstall = (...packages) => async () =>
  execute('brew', ['cask', 'install', ...packages]);

export const npmGlobalInstall = (...packages) => async () =>
  execute('npm', ['install', '--global', ...packages]);
