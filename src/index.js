if (!global._babelPolyfill) { require('babel-polyfill'); }

import ApiInterface from './apiInterface';
import Client from './client';

const api = ApiInterface();
const client = Client(api);

export default client;