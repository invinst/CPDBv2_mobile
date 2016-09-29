var express = require("express");
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var http = require('http');
var port = process.env.MOCK_SERVER_PORT || 9002;

// FIXME: Refactor the path here
var api = require(__dirname + '/mock-api');

console.log('API Server had been started at port 9002');

var server = http.createServer(app);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

// We haven't handle our api-server for specific params yet
// TODO: Handle parameters here
app.use('/*', function (req, res) {
  api.call(req.method, req.originalUrl)(req, res)
});


server.listen(port);

module.exports = server;
