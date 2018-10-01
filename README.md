# [new-dev-setup](https://gsandf.github.io/new-dev-setup/)

> Get your new GS&F laptop set up

This installs a lot of nice things so you don’t have to:

-   macOS Command Line Tools such as `git`, `make`, and Swift CLI tools
-   Properly sets up Node.js using `n` - only 1 instance of Node.js/npm is ever resolvable at once)
-   Browsers: Firefox and Chrome by default
-   Editors: [Atom](https://atom.io/) and [Code](https://code.visualstudio.com/) by default
-   And more

If there’s something missing, please either [open an issue](https://github.com/gsandf/new-dev-setup/issues/new) or add it yourself and [make a pull request](https://github.com/gsandf/new-dev-setup/compare).

## Usage

Use the 1-liner installation to run latest version directly from the repo (recommended):

```bash
bash <(curl -L 'https://raw.githubusercontent.com/gsandf/new-dev-setup/master/setup')
```

Alternatively, you can install download the [latest release](https://github.com/gsandf/new-dev-setup/releases/latest), ensure the file is executable (e.g. `chmod +x ./setup`) and run:

```bash
./setup
```

## Contributing

With [Yarn](https://yarnpkg.com/) installed, run `yarn install` to install all dependencies.

### Common Tasks

-   `yarn build` will build the `setup` binary at `./dist/setup`
-   `yarn dev` will start the project from the `src/` directory

## License

MIT
