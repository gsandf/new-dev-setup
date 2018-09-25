import execa from 'execa';

async function foundInPath(command) {
  try {
    await execa('type', ['-P', command]);
    return true;
  } catch (e) {
    return false;
  }
}

export default foundInPath;
