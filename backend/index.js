//Ladataan express muuttujaan
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
// load express-session to create a client session to server
var session = require("express-session");
//Start express
var app = express();

var queries = require("./modules/queries");
var person = require("./modules/person");
var user = require("./modules/user");
var database = require("./modules/database");
// uuid is used for cookie information
var uuid = require('uuid');
//====================MIDDLEWARES==================================================
// express session middleware
app.use(session({
    secret: uuid.v1(),
    cookie: {maxAge: 600000},
    resave: true,
    saveUninitialized: true
}));
// body-parser.json() middleware parses the json object from http POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) {
    //console.log(req.session);
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
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});
//Make express to listen to port 3000
app.listen(3000);