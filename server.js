const http = require('http');
const app = require('./app');
const  port = 1809;

const server = http.createServer(app);

console.log("running");
server.listen(port);


