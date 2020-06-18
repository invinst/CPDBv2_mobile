import { isUndefined } from 'lodash';

export const get = (url, types, cancelToken) => ((params, adapter=undefined, urlSuffix='', meta) => {
  const cancelTokenParam = isUndefined(cancelToken) ? {} : { cancelToken };
  const action = {
    types,
    payload: {
      request: {
        url: url + urlSuffix,
        params,
        adapter,
        ...cancelTokenParam,
      },
    },
  };

  if (typeof meta !== 'undefined') {
    action.meta = meta;
  }

  return action;
});

export const getUrl = (url, types, meta) => (
  {
    types,
    payload: {
      request: {
        url,
      },
    },
    meta,
  }
);

export const post = (url, types, cancelToken) => ((data, adapter) => {
  const cancelTokenParam = isUndefined(cancelToken) ? {} : { cancelToken };
  return {
    types,
    payload: {
      request: {
        method: 'POST',
        url,
        data,
        adapter,
        ...cancelTokenParam,
      },
    },
  };
});

export const put = (url, types) => ((data, adapter, cancelToken) => {
  const cancelTokenParam = isUndefined(cancelToken) ? {} : { cancelToken };
  return {
    types,
    payload: {
      request: {
        method: 'PUT',
        url,
        data,
        adapter,
        ...cancelTokenParam,
      },
    },
  };
});


export const deleteRequest = (url, types) => ((data, adapter, cancelToken) => {
  const cancelTokenParam = isUndefined(cancelToken) ? {} : { cancelToken };
  return {
    types,
    payload: {
      request: {
        method: 'DELETE',
        url,
        data,
        adapter,
        ...cancelTokenParam,
      },
    },
  };
});
