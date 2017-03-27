export const get = (url, types) => ((params, adapter, urlSuffix='', meta) => {
  const action = {
    types,
    payload: {
      request: {
        url: url + urlSuffix,
        params,
        adapter
      }
    }
  };

  if (typeof meta !== 'undefined') {
    action.meta = meta;
  }

  return action;
});

export const post = (url, types) => ((data, adapter) => ({
  types,
  payload: {
    request: {
      method: 'POST',
      url,
      data,
      adapter
    }
  }
}));
