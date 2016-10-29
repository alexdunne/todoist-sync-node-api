import Sync from './resources/sync';

// Import any resources
import Items from './resources/items';

const Client = (api) => {
  return {
    sync: Sync(api).syncRequest
  }
};

export default Client;