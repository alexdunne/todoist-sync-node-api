const Projects = (api, commandCreator) => {

  /**
   * A enum type object which contains all available actions for this resource type
   */
  const actionTypes = {
    PROJECT_ADD: 'project_add',
    PROJECT_UPDATE: 'project_update',
    PROJECT_DELETE: 'project_delete',
  };

  /**
   * Creates a project command from details provided.
   * Queues the command using the API
   * Returns the temp_id of the command so that the project can be used elsewhere
   * 
   * @param {String} name
   * @param {Object} params
   * 
   * @returns {String} The temp_id of the command created
   */
  const create = (name, params = {}) => {
    params.name = name;
    const command = commandCreator.create(actionTypes.PROJECT_ADD, params);

    api.queueCommand(command);

    return command.temp_id;
  };

  /**
   * 
   * @param {Number} id
   * @param {Object} params
   * 
   * @returns {String} The temp_id of the command created
   */
  const update = (id, params = {}) => {
    params.id = id;
    const command = commandCreator.create(actionTypes.PROJECT_UPDATE, params);

    api.queueCommand(command);

    return command.temp_id;
  };

  /**
   * 
   * @param {Number|Number[]} id
   * 
   * @returns {String} The temp_id of the command created
   */
  const remove = (ids) => {
    // API requires that the ids field is an array
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    const command = commandCreator.create(actionTypes.PROJECT_DELETE, {
      ids: ids
    });

    api.queueCommand(command);

    return command.temp_id;
  };

  return {
    create: create,
    update: update,
    remove: remove,
  };
};

export default Projects;