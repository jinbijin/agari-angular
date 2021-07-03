import config from '../../package.json';

export const environment = {
  production: true,
  apiBaseUrl: 'https://api.agari-mj.com',
  version: config.version,
  eventManager: false
};
