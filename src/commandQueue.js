const CommandQueue = () => {
  let queue = [];

  const add = (cmd) => {
    queue.push(cmd);
  };

  const clear = () => {
    queue = [];
  };

  const getQueue = () => {
    return queue;
  };

  return {
    add: add,
    clear: clear,
    getQueue: getQueue,
  };
};

export default CommandQueue;
