const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { dirname, resolve } = require('path');
const { DefinePlugin } = require('webpack');

const __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
  // High quality source maps for dev and production
  // Production source maps are separate files; dev is executed using `eval()`.
  devtool: __DEV__ ? 'eval-source-map' : 'source-map',

  entry: './src/index.js',

  mode: __DEV__ ? 'development' : 'production',

  output: {
    filename: 'setup.js',
    // Use a target that's natively compatible with Node.js
    libraryTarget: 'commonjs2',
    path: resolve(dirname('index.js'), 'dist'),
    sourceMapFilename: 'setup.js.map'
  },

  plugins: [
    // Define commonly-used global variables. Note: if you use an eslint config,
    // you will want to set these as global variables there, too.
    new DefinePlugin({ __DEV__ }),

    // Prioritizes build-time errors and shows them in a clean way
    new FriendlyErrorsWebpackPlugin({
      clearConsole: __DEV__
    })
  ],

  // Let `FriendlyErrorsWebpackPlugin` have full control over stats output
  stats: __DEV__ ? 'none' : 'normal',

  // Targets JavaScript running in an Node.js engine.
  target: 'node'
};
