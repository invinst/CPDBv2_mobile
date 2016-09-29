var buildApi = function () {
  var handleMap = {};

  var mock = function (method, uri, status, data) {
    if (!(method in handleMap)) {
      handleMap[method] = {};
    }

    handleMap[method][uri] = function (request, response) {
      response.status(status).send(data);
    };
  };

  var call = function (method, uri) {
    var doNothing = function () {};
    return (handleMap[method] || {})[uri] || doNothing;
  };

  return {
    mock: mock,
    call: call
  }
};

module.exports = buildApi();
