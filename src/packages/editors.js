import { brewCaskInstall } from './installers';

export default [
  {
    checked: true,
    name: 'Atom',
    value: {
      install: brewCaskInstall('atom'),
      name: 'Atom'
    }
  },
  {
    checked: false,
    name: 'Sublime Text',
    value: {
      install: brewCaskInstall('sublime-text'),
      name: 'Sublime Text'
    }
  },
  {
    checked: true,
    name: 'Visual Studio Code',
    value: {
      install: brewCaskInstall('visual-studio-code'),
      name: 'Visual Studio Code'
    }
  }
];
