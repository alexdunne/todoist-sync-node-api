import uuid from 'uuid';

const CommandCreator = () => {

  /**
   * Creates a command object which is wrapped 
   * with the uuid and temp_id required by the Sync API
   */
  const create = (type, params) => ({
    type: type,
    temp_id: uuid.v4(),
    uuid: uuid.v4(),
    args: params
  });

  return {
    create: create
  };
};

export default CommandCreator;