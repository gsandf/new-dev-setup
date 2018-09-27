import { brewCaskInstall } from './installers';

export default [
  {
    checked: true,
    name: 'Firefox',
    value: {
      install: brewCaskInstall('firefox'),
      name: 'Firefox'
    }
  },
  {
    checked: false,
    name: 'Firefox Developer Edition',
    value: {
      install: brewCaskInstall('firefox-developer-edition'),
      name: 'Firefox Developer Edition'
    }
  },
  {
    checked: true,
    name: 'Google Chrome',
    value: {
      install: brewCaskInstall('google-chrome'),
      name: 'Google Chrome'
    }
  },
  {
    checked: false,
    name: 'Google Chrome Canary',
    value: {
      install: brewCaskInstall('google-chrome-canary'),
      name: 'Google Chrome Canary'
    }
  }
];
