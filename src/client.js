import Items from './resources/items';
import Projects from './resources/projects';

/**
 * Top level interface to each of the resouces and the generic sync call
 *
 * @param {ApiInterface} api
 * @param {CommandCreator} commandCreator
 *
 * @return {Object} The interface of the API wrapper
 */
const Client = (api, commandCreator) => {
  return {
    commit: api.commit,
    sync: api.sync,

    // Attach the resources
    items: Items(api, commandCreator),
    projects: Projects(api, commandCreator),
  };
};

export default Client;
