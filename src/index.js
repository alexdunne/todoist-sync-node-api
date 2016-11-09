if (!global._babelPolyfill) {
  require('babel-polyfill');
}

import Api from './api';
import CommandCreator from './commandCreator';
import CommandQueue from './commandQueue';
import Client from './client';

const commandQueue = CommandQueue();
const commandCreator = CommandCreator();
const api = Api(commandQueue);

const client = Client(api, commandCreator);

export default client;
