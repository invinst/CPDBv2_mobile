const { isNil } = require('lodash');

const hashBody = (body) => JSON.stringify(body, Object.keys(body).sort());
const return404 = (response) => response.status(404).send();

const buildApi = function () {
  let handleMap = {};

  const getCurrentResponse = function (responseObj) {
    if (responseObj === undefined) {
      return null;
    }
    let counter = responseObj.responses.length === 1 ? 0 : responseObj.counter;
    let response = responseObj.responses[counter];
    responseObj.counter++;
    return response;
  };

  const mock = function (method, uri, status, data) {
    if (!(method in handleMap)) {
      handleMap[method] = {};
    }

    if (!(uri in handleMap[method])) {
      handleMap[method][uri] = {
        counter: 0,
        responses: [],
      };
    }

    handleMap[method][uri].responses.push(function (response) {
      response.status(status).send(data);
    });
  };

  const mockPostPut = function (uri, status, body, data, delay=0, sideEffects, method) {
    if (!(method in handleMap)) {
      handleMap[method] = {};
    }
    if (!(uri in handleMap[method])) {
      handleMap[method][uri] = {};
    }

    const resolveFunc = function (response) {
      const responseIndex = Math.min(resolveFunc.responses.length -1, resolveFunc.counter);
      const content = resolveFunc.responses[responseIndex];
      resolveFunc.counter += 1;
      setTimeout(
        () => (typeof content === 'undefined') ?
          return404(response) :
          response.status(status).send(content),
        delay
      );
    };
    resolveFunc.counter = 0;
    resolveFunc.responses = sideEffects || [data];

    handleMap[method][uri][hashBody(body)] = resolveFunc;
  };

  const mockPostPutNoBody = function (uri, status, data, method) {
    if (!(method in handleMap)) {
      handleMap[method] = {};
    }

    handleMap[method][uri] = response => response.status(status).send(data);
  };

  const mockPost = function (uri, status, body, data, delay=0, sideEffects) {
    if (isNil(body)) {
      mockPostPutNoBody(uri, status, data, 'POST');
    } else {
      mockPostPut(uri, status, body, data, delay, sideEffects, 'POST');
    }
  };

  const mockPut = function (uri, status, body, data, delay = 0, sideEffects) {
    if (isNil(body)) {
      mockPostPutNoBody(uri, status, data, 'PUT');
    } else {
      mockPostPut(uri, status, body, data, delay, sideEffects, 'PUT');
    }
  };

  const cleanMock = function () {
    handleMap = {};
  };

  const call = function (req) {
    const uri = req.originalUrl;
    if (req.method === 'POST' || req.method === 'PUT') {
      const handler = (handleMap[req.method] || {})[uri] || {};
      if (typeof handler === 'function') {
        return handler;
      }
      return handler[hashBody(req.body)] || return404;
    } else {
      return getCurrentResponse((handleMap[req.method] || {})[uri]) || return404;
    }
  };

  return {
    mock: mock,
    mockPost: mockPost,
    mockPut: mockPut,
    cleanMock: cleanMock,
    call: call,
    handleMap: handleMap,
  };
};

module.exports = buildApi();
