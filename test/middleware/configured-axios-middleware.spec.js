import { getActionTypes } from 'redux-axios-middleware';

import { onSuccess, onError } from 'middleware/configured-axios-middleware';

describe('configured-axios-middleware', function () {
  const next = (action) => (action);
  const action = {
    type: 'REQUEST',
    payload: {
      request: {
        url: '/request-url'
      }
    }
  };

  describe('onSuccess', () => {
    const response = {
      data: [1, 2, 3]
    };

    it('should fire action with response as payload', () => {
      onSuccess({ action, next, response }).should.eql({
        type: getActionTypes(action)[1],
        payload: response.data,
        meta: undefined
      });
    });

    it('should fire action with provided metadata', () => {
      const actionWithMeta = {
        ...action,
        meta: 'foobar'
      };

      onSuccess({
        action: actionWithMeta,
        next,
        response
      }).should.eql({
        type: getActionTypes(action)[1],
        payload: response.data,
        meta: 'foobar'
      });
    });
  });

  describe('onError', () => {
    it('should fire action with error with response without message', function () {
      const error = {
        status: 400
      };

      onError({ action, next, error }).should.eql({
        type: getActionTypes(action)[2],
        payload: {
          message: 'Request to /request-url failed with status code 400.'
        },
        statusCode: 400
      });
    });

    it('should fire action with error object', function () {
      const message = 'Axios error message';
      const error = new Error(message);

      onError({ action, next, error }).should.eql({
        type: getActionTypes(action)[2],
        payload: {
          message
        },
        statusCode: null
      });
    });

    it('should fire action with error with message in response', function () {
      const message = 'You\'ve entered an incorrect password.';
      const error = {
        status: 400,
        data: { message }
      };

      onError({ action, next, error }).should.eql({
        type: getActionTypes(action)[2],
        payload: {
          message
        },
        statusCode: 400
      });
    });
  });
});
