var hashBody = (body) => JSON.stringify(body, Object.keys(body).sort());

var buildApi = function () {
  var handleMap = {};

  var getCurrentResponse = function (responseObj) {
    if (responseObj === undefined) {
      return null;
    }
    let counter = responseObj.responses.length === 1 ? 0 : responseObj.counter;
    let response = responseObj.responses[counter];
    responseObj.counter++;
    return response;
  };

  var mock = function (method, uri, status, data) {
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

  var mockPost = function (uri, status, body, data, delay) {
    var method = 'POST';
    if (!(method in handleMap)) {
      handleMap[method] = {};
    }
    if (!(uri in handleMap[method])) {
      handleMap[method][uri] = {};
    }

    handleMap[method][uri][hashBody(body)] = function (response) {
      if (delay) {
        setTimeout(
          function () {
            response.status(status).send(data);
          },
          delay
        );
      } else {
        response.status(status).send(data);
      }
    };
  };

  var mockPut = function (uri, status, body, data, delay) {
    var method = 'PUT';
    if (!(method in handleMap)) {
      handleMap[method] = {};
    }
    if (!(uri in handleMap[method])) {
      handleMap[method][uri] = {};
    }

    handleMap[method][uri][hashBody(body)] = function (response) {
      if (delay) {
        setTimeout(
          function () {
            response.status(status).send(data);
          },
          delay
        );
      } else {
        response.status(status).send(data);
      }
    };
  };

  var cleanMock = function () {
    handleMap = {};
  };

  var call = function (req) {
    var uri = req.originalUrl;
    var return404 = (response) => response.status(404).send();
    if (req.method === 'POST' || req.method === 'PUT') {
      return ((handleMap[req.method] || {})[uri] || {})[hashBody(req.body)] || return404;
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
