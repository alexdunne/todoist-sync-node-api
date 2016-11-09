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

  beforeEach(function() {
    commandQueue.clear();
  });

  it('Creates with name "Test project"', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    client.projects.create('Test project');

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    // Ensure the command has the required fields
    const command = updatedQueue[0];
    assert.ok(command.type === 'project_add');
    assert.ok(command.hasOwnProperty('args'));
    assert.ok(command.args.hasOwnProperty('name'));
    assert.ok(command.args.name === 'Test project');
  });

  it('Updates a project with new name "Updated project"', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    const id = client.projects.create('Test project');

    client.projects.update(id, {
      name: 'Updated project',
    });

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 2);

    const updateCommand = updatedQueue[1];
    assert.ok(updateCommand.type === 'project_update');
    assert.ok(updateCommand.hasOwnProperty('args'));
    assert.ok(updateCommand.args.hasOwnProperty('id'));
    assert.ok(updateCommand.args.id === id);
    assert.ok(updateCommand.args.hasOwnProperty('name'));
    assert.ok(updateCommand.args.name === 'Updated project');
  });

  it('Removes a single project', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    const id = client.projects.create('Test project');

    client.projects.remove(id);

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 2);

    const removeCommand = updatedQueue[1];
    assert.ok(removeCommand.type === 'project_delete');
    assert.ok(removeCommand.hasOwnProperty('args'));
    assert.ok(removeCommand.args.hasOwnProperty('ids'));
    assert.ok(removeCommand.args.ids.length === 1);
    assert.ok(removeCommand.args.ids[0] === id);
  });

  it('Removes multiple projects', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    let projectIds = [];

    projectIds.push(client.projects.create('First project'));
    projectIds.push(client.projects.create('Second project'));

    client.projects.remove(projectIds);

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 3);

    const removeCommand = updatedQueue[2];
    assert.ok(removeCommand.type === 'project_delete');
    assert.ok(removeCommand.hasOwnProperty('args'));
    assert.ok(removeCommand.args.hasOwnProperty('ids'));
    assert.ok(removeCommand.args.ids.length === 2);
    assert.ok(removeCommand.args.ids[0] === projectIds[0]);
    assert.ok(removeCommand.args.ids[1] === projectIds[1]);
  });
});