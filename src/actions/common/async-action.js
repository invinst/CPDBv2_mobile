export const get = (url, types, cancelToken) => ((params, adapter=undefined, urlSuffix='', meta) => {
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

  if (typeof cancelToken !== 'undefined') {
    action.payload.request.cancelToken = cancelToken;
  }

  return action;
});

export const getUrl = (url, types, meta) => (
  {
    types,
    payload: {
      request: {
        url
      }
    },
    meta
  }
);

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

export const put = (url, types) => ((data, adapter) => ({
  types,
  payload: {
    request: {
      method: 'PUT',
      url,
      data,
      adapter
    }
  }
}));
