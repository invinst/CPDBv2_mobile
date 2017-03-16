export const get = (url, types) => ((params, adapter, urlSuffix='') => ({
  types,
  payload: {
    request: {
      url: url + urlSuffix,
      params,
      adapter
    }
  }
}));

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
