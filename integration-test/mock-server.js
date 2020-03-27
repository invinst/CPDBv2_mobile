const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const nightwatchConfig = require('../nightwatch.json');
const port = process.env.MOCK_SERVER_PORT || 9002;

// FIXME: Refactor the path here
const api = require(__dirname + '/mock-api');
api.port = port;

console.info(`API Server has been started at port ${port}`);

const server = http.createServer(app);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors({
  origin: nightwatchConfig['test_settings']['default']['globals']['clientUrl'],
  credentials: true,
}));

// We haven't handle our api-server for specific params yet
// TODO: Handle parameters here
app.use('/*', function (req, res) {
  api.call(req)(res);
});


server.listen(port);

module.exports = server;
