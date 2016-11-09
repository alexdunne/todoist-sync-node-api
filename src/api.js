import request from 'request';
require('request-to-curl');

/**
 * A HTTP wrapper around the sync API which preforms POST requests to the api route given.
 * 
 * @param {CommandQueue} queue
 */
const Api = (queue, params = {}) => {
  const options = Object.assign({
    baseUrl: 'https://todoist.com/API/v7/sync',
    token: process.env.TODOIST_OAUTH_TOKEN,
    sync_token: '*',
    resource_types: '["all"]'
  }, params);

  const queueCommand = command => {
    queue.add(command);
  };

  /**
   * Creates a single request using the commands in the queue.
   * 
   * @returns {Promise}
   */
  const commit = () => {
    const response = post(getUrl(), getCommandRequestData());
    queue.clear();
    return response;
  };

  /**
   * Preforms a sync request to fetch data from the endpoint
   * 
   * @returns {Promise}
   */
  const sync = () => {
    return post(
      getUrl(), { 
        resource_types: options.resource_types,
        token: options.token,
        sync_token: options.sync_token,
      }
    )
  };

  const post = (url, data) => {
    const params = { url: url, form: data };
    
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