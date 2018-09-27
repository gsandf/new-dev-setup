import execa from 'execa';

/**
 * Executes a command and handles piping stderr/stdout
 * @param {String} file - the executable to run
 * @param {Array<String>} args - arguments passed to the executable
 * @param {Object} options - options passed to `execa`
 * @returns {Promise} Resolves when command has completed running
 */
function execute(file, args, options) {
  const command = execa(file, args, options);
  command.stdout.pipe(process.stdout);
  command.stderr.pipe(process.stderr);
  return command;
}

/**
 * Executes a command and handles piping stderr/stdout
 * @param {String} script - the script to run in a shell
 * @param {Object} options - options passed to `execa`
 * @returns {Promise} Resolves when command has completed running
 */
function executeShell(script, options) {
  const command = execa.shell(script, options);
  command.stdout.pipe(process.stdout);
  command.stderr.pipe(process.stderr);
  return command;
}

export { execute, executeShell };
