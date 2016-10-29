import assert from 'assert';

import ApiInterface from '../lib/apiInterface';
import Client from '../lib/client';

let api;
let client;

describe('Todoist API client', () => {
  before(function() {
    api = ApiInterface();
    client = Client(api);
  });

  it('Has sync method', function() {
    assert.ok(client.hasOwnProperty('sync'));
  });

  it('Returns a promise when calling sync', function() {
    assert.ok(client.sync() instanceof Promise);
  });

  it('Calls the Sync API for a full sync request', function(done) {
    client
      .sync()
      .then(res => {
        console.log('done');
      })
      .then(done)
      .catch(done)
  });
});