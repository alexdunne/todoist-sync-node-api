const Items = (api, commandCreator) => {
  const actionTypes = {
    ITEM_ADD: 'item_add',
  };

   /**
   * Creates a item_add command from the details provided.
   * Queues the command using the API.
   * Returns the temp_id of the command so that the project can be used
   * elsewhere.
   *
   * @param {String} content
   * @param {Object} params
   *
   * @return {String} The temp_id of the command created
   */
  const create = (content, params = {}) => {
    params.content = content;
    const command = commandCreator.create(actionTypes.ITEM_ADD, params);

    api.queueCommand(command);

    return command.temp_id;
  };

  return {
    create: create,
  };
};

export default Items;
