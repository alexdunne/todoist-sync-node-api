const Projects = (api, commandCreator) => {
  /**
   * A enum type object which contains all available actions for this
   * resource type.
   */
  const actionTypes = {
    PROJECT_ADD: 'project_add',
    PROJECT_UPDATE: 'project_update',
    PROJECT_DELETE: 'project_delete',
    PROJECT_ARCHIVE: 'project_archive',
    PROJECT_UNARCHIVE: 'project_unarchive',
  };

  /**
   * Creates a project command from details provided.
   * Queues the command using the API.
   *
   * @param {String} name
   * @param {Object} params
   *
   * @return {String} The temp_id of the command created
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
   * @return {String} The temp_id of the command created
   */
  const update = (id, params = {}) => {
    params.id = id;
    const command = commandCreator.create(actionTypes.PROJECT_UPDATE, params);

    api.queueCommand(command);

    return command.temp_id;
  };

  /**
   *
   * @param {Number|Number[]} ids
   *
   * @return {String} The temp_id of the command created
   */
  const remove = (ids) => {
    // API requires that the ids field is an array
    ids = wrapWithArray(ids);

    const command = commandCreator.create(actionTypes.PROJECT_DELETE, {
      ids: ids,
    });

    api.queueCommand(command);

    return command.temp_id;
  };

  /**
   *
   * @param {Number|Number[]} ids
   *
   * @return {String} The temp_id of the command created
   */
  const archive = (ids) => {
    // API requires that the ids field is an array
    ids = wrapWithArray(ids);

    const command = commandCreator.create(actionTypes.PROJECT_ARCHIVE, {
      ids: ids,
    });

    api.queueCommand(command);

    return command.temp_id;
  };

  /**
   *
   * @param {Number|Number[]} ids
   *
   * @return {String} The temp_id of the command created
   */
  const unarchive = (ids) => {
    // API requires that the ids field is an array
    ids = wrapWithArray(ids);

    const command = commandCreator.create(actionTypes.PROJECT_UNARCHIVE, {
      ids: ids,
    });

    api.queueCommand(command);

    return command.temp_id;
  };

  /**
   * If the given value is not already an array wrap it in one.
   *
   * @param {any} val The value to be wrapped
   *
   * @return {Array} The given value wrapped in an array
   */
  const wrapWithArray = (val) => {
    return !Array.isArray(val) ? [val] : val;
  };

  return {
    create: create,
    update: update,
    remove: remove,
    archive: archive,
    unarchive: unarchive,
  };
};

export default Projects;
