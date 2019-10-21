import appPath from 'app-path';

/**
 * Check if an app is installed or not.
 * @param {String} appName App name or bundle identifier
 * @return {Boolean|String} The path to the installed app if it was found.
 * Otherwise, returns `false`.
 */
async function alreadyInstalled(appName) {
  try {
    const installPath = await appPath(appName);
    return `Already installed at ${installPath}`;
  } catch (error) {
    return false;
  }
}

export default alreadyInstalled;
