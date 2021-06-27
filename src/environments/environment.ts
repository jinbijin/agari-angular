import 'zone.js/plugins/zone-error';

import config from '../../package.json';

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5001',
  version: config.version
};
