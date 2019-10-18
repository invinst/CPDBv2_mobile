import { Promise } from 'es6-promise';
import { createAction } from 'redux-actions';
import axiosMiddleware, { getActionTypes } from 'redux-axios-middleware';
import { get, identity } from 'lodash';

import axiosClient, { REQUEST_CANCEL_MESSAGE } from 'utils/axios-client';

const SUCCESS_TYPE_INDEX = 1;
const FAILURE_TYPE_INDEX = 2;
const CANCELLED_TYPE_INDEX = 3;


const getErrorMessage = (action, error) => {
  if (get(error, 'response.data.message')) {
    return error.response.data.message;
  } else if (get(error, 'response.status')) {
    return `Request to ${action.payload.request.url} failed with status code ${error.response.status}.`;
  } else {
    return error.message;
  }
};

export const onSuccess = ({ action, next, response }, options) => {
  const actionTypeIndex = response.cancelled ? CANCELLED_TYPE_INDEX : SUCCESS_TYPE_INDEX;
  const actionType = getActionTypes(action, options)[actionTypeIndex];

  const actionCreator = createAction(actionType, identity, () => action.meta);
  const nextAction = {
    ...actionCreator(response.data),
    request: response.config,
  };

  next(nextAction);
  return nextAction;
};

export const onError = ({ action, next, error }, options) => {
  const nextAction = {
    type: getActionTypes(action, options)[FAILURE_TYPE_INDEX],
    statusCode: get(error, 'response.status', null),
    payload: {
      message: getErrorMessage(action, error),
      ...get(error, 'response.data', {}),
    },
  };
  next(nextAction);
  return nextAction;
};

const interceptors = {
  response: [{
    error: (_, error) => {
      if (error.message === REQUEST_CANCEL_MESSAGE) {
        return Promise.resolve({ cancelled: true });
      } else {
        return Promise.reject(error);
      }
    },
  }],
};

export default axiosMiddleware(axiosClient, {
  onSuccess,
  onError,
  interceptors,
  errorSuffix: '_FAILURE',
  returnRejectedPromiseOnError: true,
});
