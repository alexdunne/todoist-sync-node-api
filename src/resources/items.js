const Items = (api, commandCreator) => {

  const actionTypes = {
    ITEM_ADD: 'item_add',
  };

  const create = (content, params = {}) => {
    params.name = content;
    const command = commandCreator.create(actionTypes.ITEM_ADD, params);

    api.queueCommand(command);

    return command.uuid;
  };

  return {
    create: create
  };
};

export default Items;