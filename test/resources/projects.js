import assert from 'assert';

import Api from '../../lib/api';
import CommandCreator from '../../lib/commandCreator';
import CommandQueue from '../../lib/commandQueue';
import Client from '../../lib/client';

let api;
let commandQueue;
let commandCreator;
let client;

describe('API projects resource', () => {
  before(function() {
    commandQueue = CommandQueue();
    commandCreator = CommandCreator();
    api = Api(commandQueue);
    client = Client(api, commandCreator);
  });

  it('Creates add project command with name "Test project"', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    client.projects.create('Tester project');

    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);
    assert.ok(updatedQueue[0].type === 'project_add');
  });
});