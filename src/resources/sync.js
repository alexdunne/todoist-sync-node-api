const Sync = (apiInterface) => {
  const syncRequest = () => {
    return apiInterface.post();
  };

  return {
    syncRequest: syncRequest
  };
};

export default Sync;