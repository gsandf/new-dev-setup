import { brewCaskInstall, npmGlobalInstall } from './installers';

export default [
  {
    checked: false,
    name: 'Insomnia (https://insomnia.rest)',
    value: {
      install: brewCaskInstall('insomnia'),
      name: 'Insomnia'
    }
  },
  {
    checked: false,
    name: 'Kitematic (https://kitematic.com)',
    value: {
      install: brewCaskInstall('kitematic'),
      name: 'Kitematic'
    }
  },
  {
    checked: false,
    name: 'Mojibar (https://github.com/muan/mojibar)',
    value: {
      install: brewCaskInstall('mojibar'),
      name: 'Mojibar'
    }
  },
  {
    checked: false,
    name: 'Postman (https://www.getpostman.com)',
    value: {
      install: brewCaskInstall('postman'),
      name: 'Postman'
    }
  },
  {
    checked: false,
    name: 'Sequel Pro (https://www.sequelpro.com)',
    value: {
      install: brewCaskInstall('sequel-pro'),
      name: 'Sequel Pro'
    }
  },
  {
    checked: true,
    name: 'serve (https://github.com/zeit/serve)',
    value: {
      install: npmGlobalInstall('serve'),
      name: 'serve'
    }
  },
  {
    checked: true,
    name: 'Slack (https://slack.com/)',
    value: {
      install: brewCaskInstall('slack'),
      name: 'Slack'
    }
  },
  {
    checked: false,
    name: 'Sqlectron (https://sqlectron.github.io/)',
    value: {
      install: brewCaskInstall('sqlectron'),
      name: 'Sqlectron'
    }
  }
];
