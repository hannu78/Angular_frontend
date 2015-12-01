//Ladataan express muuttujaan
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
//Käynnistetään express
var app = express();

var queries = require("./modules/queries");
var person = require("./modules/person");
var user = require("./modules/user");
var database = require("./modules/database");
//====================MIDDLEWARES==================================================
// body-parser.json() middleware parses the json object from http POST request
app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) {
    next();
});
// Define middleware for static (.html, .css, .js) files that are loaded by browser
// when parsing index.html
app.use('/', express.static(path.join(__dirname, '../frontend/views')));
app.use('/frontend/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/frontend/lib', express.static(path.join(__dirname, '../frontend/lib')));
app.use('/frontend/modules', express.static(path.join(__dirname, '../frontend/modules')));
app.use('/frontend/controllers', express.static(path.join(__dirname, '../frontend/controllers')));
app.use('/frontend/factories', express.static(path.join(__dirname, '../frontend/factories')));
// ===================REST API MIDDLEWARE==========================================
app.use('/persons', person);
app.use('/friends', user);
//====================ROUTERS======================================================
//Asetetaan express kuuntelemaan porttia 3000
app.listen(3000);