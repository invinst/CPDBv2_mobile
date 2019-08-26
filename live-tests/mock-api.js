var hashBody = (body) => JSON.stringify(body, Object.keys(body).sort());

var buildApi = function () {
  var handleMap = {};

  var mock = function (method, uri, status, data) {
    if (!(method in handleMap)) {
      handleMap[method] = {};
    }

    handleMap[method][uri] = function (response) {
      response.status(status).send(data);
    };
  };

  var mockPost = function (uri, status, body, data) {
    var method = 'POST';
    if (!(method in handleMap)) {
      handleMap[method] = {};
    }
    if (!(uri in handleMap[method])) {
      handleMap[method][uri] = {};
    }

    handleMap[method][uri][hashBody(body)] = function (response) {
      response.status(status).send(data);
    };
  };
  var cleanMock = function () {
    handleMap = {};
  };

  var call = function (req) {
    var uri = req.originalUrl;
    var return404 = (response) => response.status(404).send();
    if (req.method === 'POST') {
      return ((handleMap[req.method] || {})[uri] || {})[hashBody(req.body)] || return404;
    } else {
      return (handleMap[req.method] || {})[uri] || return404;
    }
  };

  return {
    mock: mock,
    mockPost: mockPost,
    cleanMock: cleanMock,
    call: call,
  };
};

module.exports = buildApi();
