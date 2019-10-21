import { brewCaskInstall } from './installers';
import alreadyInstalled from './alreadyInstalled';

export default async () => [
  {
    checked: false,
    disabled: await alreadyInstalled('Atom'),
    name: 'Atom',
    value: {
      install: brewCaskInstall('atom'),
      name: 'Atom'
    }
  },
  {
    checked: false,
    disabled: await alreadyInstalled('Sublime Text'),
    name: 'Sublime Text',
    value: {
      install: brewCaskInstall('sublime-text'),
      name: 'Sublime Text'
    }
  },
  {
    checked: true,
    disabled: await alreadyInstalled('Visual Studio Code'),
    name: 'Visual Studio Code',
    value: {
      install: brewCaskInstall('visual-studio-code'),
      name: 'Visual Studio Code'
    }
  }
];
