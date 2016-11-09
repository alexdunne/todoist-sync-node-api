import assert from 'assert';

import Api from '../../lib/api';
import CommandCreator from '../../lib/commandCreator';
import CommandQueue from '../../lib/commandQueue';
import Client from '../../lib/client';

let api;
let commandQueue;
let commandCreator;
let client;

describe('API items resource', function() {
  before(function() {
    commandQueue = CommandQueue();
    commandCreator = CommandCreator();
    api = Api(commandQueue);
    client = Client(api, commandCreator);
  });

  it('Creates with content "Test"', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    client.items.create('Test');

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    // Ensure the command has the required fields
    const command = updatedQueue[0];
    assert.ok(command.type === 'item_add');
    assert.ok(command.hasOwnProperty('args'));
    assert.ok(command.args.hasOwnProperty('content'));

  });
});