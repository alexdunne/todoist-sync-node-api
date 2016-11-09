import request from 'request';
require('request-to-curl');

/**
 * A HTTP wrapper around the sync API which preforms
 * POST requests to the api route given.
 *
 * @param {CommandQueue} queue
 * @param {Object} params Any additional parameters
 *
 * @return {Object} The api interface
 */
const Api = (queue, params = {}) => {
  const options = Object.assign({
    baseUrl: 'https://todoist.com/API/v7/sync',
    token: process.env.TODOIST_OAUTH_TOKEN,
    sync_token: '*',
    resource_types: '["all"]',
  }, params);

  /**
   * Added a command to the quue to be commited
   *
   * @param {Object} command The command to be queued
   *
   * @return {undefined}
   */
  const queueCommand = (command) => {
    queue.add(command);
  };

  /**
   * Creates a single request using the commands in the queue.
   *
   * @return {Promise} Includes the response from the commit request
   */
  const commit = () => {
    const response = post(getUrl(), getCommandRequestData());
    queue.clear();
    return response;
  };

  /**
   * Preforms a sync request to fetch data from the endpoint
   *
   * @return {Promise} Any new data from the Sync API relative to the sync_token
   */
  const sync = () => {
    return post(
      getUrl(), {
        resource_types: options.resource_types,
        token: options.token,
        sync_token: options.sync_token,
      }
    );
  };

  const post = (url, data) => {
    const params = {url: url, form: data};

    return new Promise((resolve, reject) => {
      request.post(params, (err, res, payload) => {
        if (err) {
          reject(err);
        }

        // Save the sync token for future requests
        if (payload.sync_token) {
          options.sync_token = payload.sync_token;
        }

        resolve({
          payload: payload,
          response: res,
        });
      });
    });
  };

  const getUrl = (path = '') => {
    return options.baseUrl + path;
  };

  const getCommandRequestData = () => {
    return {
      commands: JSON.stringify(queue.getQueue()),
      token: options.token,
      sync_token: options.sync_token,
    };
  };

  return {
    commit: commit,
    sync: sync,
    queueCommand: queueCommand,
  };
};

export default Api;
