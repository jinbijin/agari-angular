import 'zone.js/plugins/zone-error';

import { version } from '../../package.json';

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5001',
  version
};
