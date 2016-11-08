import assert from 'assert';

import Api from '../lib/api';
import CommandCreator from '../lib/commandCreator';
import CommandQueue from '../lib/commandQueue';
import Client from '../lib/client';

let api;
let commandQueue;
let commandCreator;
let client;

describe('Todoist API client', () => {
  before(function() {
    commandQueue = CommandQueue();
    commandCreator = CommandCreator();
    api = Api(commandQueue);
    client = Client(api, commandCreator);
  });

  it('Has sync method', function() {
    assert.ok(client.hasOwnProperty('sync'));
  });

  it('Returns a promise when calling sync', function() {
    assert.ok(client.sync() instanceof Promise);
  });

  it('Has commit method', function() {
    assert.ok(client.hasOwnProperty('commit'));
  });

  it('Returns a promise when calling commit', function() {
    assert.ok(client.commit() instanceof Promise);
  });

  it('Has items method', function() {
    assert.ok(client.hasOwnProperty('items'));
  });

  it('Has projects method', function() {
    assert.ok(client.hasOwnProperty('projects'));
  });
});