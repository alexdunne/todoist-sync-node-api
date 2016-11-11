import Items from './resources/items';
import Projects from './resources/projects';

/**
 * Top level interface to each of the resources and the generic sync call
 *
 * @param {Api} api
 * @param {ResourceHelper} resourceHelper
 *
 * @return {Object} The interface of the API wrapper
 */
const Client = (api, resourceHelper) => {
  return {
    commit: api.commit,
    sync: api.sync,

    // Attach the resources
    items: Items(resourceHelper),
    projects: Projects(resourceHelper),
  };
};

export default Client;
