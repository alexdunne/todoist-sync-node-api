import request from 'request';

/**
 * A HTTP wrapper around the sync API which preforms POST requests to the api route given.
 */
const ApiInterface = (params) => {
  const options = Object.assign({
    baseUrl: 'https://todoist.com/API/v7/sync/',
    token: '57a66d45a022897b3270af21546707efcaf8af69',
    sync_token: '*',
    resource_types: '["all"]'
  }, params);

  const post = (path= '', data = null) => {
    if (!options.token) {
      throw new Error('No token provided. Have you authed?')
    }

    const params = {
      url: createUrl(path),
      form: createData(data)
    };

    return new Promise((resolve, reject) => {
      request.post(params, (err, res, payload) => {
        if (err) {
          reject(err);
        }

        console.log(res);

        resolve(res);
      });
    });
  };

  const createUrl = (path) => {
    return options.baseUrl + path;
  }

  const createData = (data) => {
    return Object.assign({
      resource_types: options.resource_types
    }, data, {
      token: options.token,
      sync_token: options.sync_token
    });
  };

  return {
    post: post
  };
};

export default ApiInterface;