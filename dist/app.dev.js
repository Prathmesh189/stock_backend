"use strict";

var express = require('express');

var app = express();

var path = require('path');

app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/uploads', express["static"](path.join(__dirname, 'uploads')));
console.log("App.js file");

var userRoutes = require('./routes/user_routes');

var syallbus = require('./routes/syallabus_routes');

var terms_condn = require('./routes/terms_condn');

app.get('/', function (req, res) {
  res.send({
    status: "Running on server hit your endpoints"
  });
});
app.use("/api/users", userRoutes);
app.use("/api/syallbus", syallbus);
app.use("/api/terms-privacy", terms_condn);
module.exports = app;