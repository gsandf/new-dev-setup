import foundInPath from '../foundInPath';
import alreadyInstalled from './alreadyInstalled';
import { brewCaskInstall, npmGlobalInstall } from './installers';

export default async () => [
  {
    checked: true,
    disabled: await alreadyInstalled('Insomnia'),
    name: 'Insomnia (https://insomnia.rest)',
    value: {
      install: brewCaskInstall('insomnia'),
      name: 'Insomnia'
    }
  },
  {
    checked: false,
    disabled: await alreadyInstalled('Kitematic (Beta)'),
    name: 'Kitematic (https://kitematic.com)',
    value: {
      install: brewCaskInstall('kitematic'),
      name: 'Kitematic'
    }
  },
  {
    checked: false,
    disabled: await alreadyInstalled('Mojibar'),
    name: 'Mojibar (https://github.com/muan/mojibar)',
    value: {
      install: brewCaskInstall('mojibar'),
      name: 'Mojibar'
    }
  },
  {
    checked: false,
    disabled: await alreadyInstalled('Postman'),
    name: 'Postman (https://www.getpostman.com)',
    value: {
      install: brewCaskInstall('postman'),
      name: 'Postman'
    }
  },
  {
    checked: false,
    disabled: await alreadyInstalled('Sequel Pro'),
    name: 'Sequel Pro (https://www.sequelpro.com)',
    value: {
      install: brewCaskInstall('sequel-pro'),
      name: 'Sequel Pro'
    }
  },
  {
    checked: true,
    disabled: await foundInPath('serve'),
    name: 'serve (https://github.com/zeit/serve)',
    value: {
      install: npmGlobalInstall('serve'),
      name: 'serve'
    }
  },
  {
    checked: true,
    disabled: await alreadyInstalled('Slack'),
    name: 'Slack (https://slack.com/)',
    value: {
      install: brewCaskInstall('slack'),
      name: 'Slack'
    }
  },
  {
    checked: false,
    disabled: await alreadyInstalled('Sqlectron'),
    name: 'Sqlectron (https://sqlectron.github.io/)',
    value: {
      install: brewCaskInstall('sqlectron'),
      name: 'Sqlectron'
    }
  }
];
