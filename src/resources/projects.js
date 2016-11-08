const Projects = (api, commandCreator) => {

  /**
   * A enum type object which contains all available actions for this resource type
   */
  const actionTypes = {
    PROJECT_ADD: 'project_add',
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

  return {
    create: create,
  };
};

export default Projects;