import { createAction } from 'redux-actions';
import axiosMiddleware, { getActionTypes } from 'redux-axios-middleware';
import axiosClient from 'utils/axios-client';
import { get } from 'lodash';


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
  const nextActionCreator = createAction(
    getActionTypes(action, options)[1],
    payload => payload,
    _ => action.meta
  );
  const nextAction = nextActionCreator(response.data);
  next(nextAction);
  return nextAction;
};

export const onError = ({ action, next, error }, options) => {
  const nextAction = {
    type: getActionTypes(action, options)[2],
    statusCode: get(error, 'response.status', null),
    payload: {
      message: getErrorMessage(action, error),
      ...get(error, 'response.data', {}),
    },
  };
  next(nextAction);
  return nextAction;
};

export default axiosMiddleware(axiosClient, {
  onSuccess,
  onError,
  errorSuffix: '_FAILURE',
  returnRejectedPromiseOnError: true,
});
