"use strict";

var http = require('http');

var app = require('./app');

var port = 1809;
var server = http.createServer(app);
console.log("running");
server.listen(port);