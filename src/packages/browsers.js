import alreadyInstalled from './alreadyInstalled';
import { brewCaskInstall } from './installers';

export default async () => [
  {
    checked: true,
    disabled: await alreadyInstalled('Brave Browser'),
    name: 'Brave',
    value: {
      install: brewCaskInstall('brave-browser'),
      name: 'Brave'
    }
  },
  {
    checked: true,
    disabled: await alreadyInstalled('Firefox'),
    name: 'Firefox',
    value: {
      install: brewCaskInstall('firefox'),
      name: 'Firefox'
    }
  },
  {
    checked: false,
    disabled: await alreadyInstalled('Firefox Developer Edition'),
    name: 'Firefox Developer Edition',
    value: {
      install: brewCaskInstall('firefox-developer-edition'),
      name: 'Firefox Developer Edition'
    }
  },
  {
    checked: true,
    disabled: await alreadyInstalled('Google Chrome'),
    name: 'Google Chrome',
    value: {
      install: brewCaskInstall('google-chrome'),
      name: 'Google Chrome'
    }
  },
  {
    checked: false,
    disabled: await alreadyInstalled('Google Chrome Canary'),
    name: 'Google Chrome Canary',
    value: {
      install: brewCaskInstall('google-chrome-canary'),
      name: 'Google Chrome Canary'
    }
  }
];
