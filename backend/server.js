//Load node modules
var express = require("express");
var path = require("path");
var https = require("https");
var fs = require("fs");
var bodyParser = require("body-parser");
var session = require("express-session");
var uuid = require('uuid');
var jwt = require('jsonwebtoken');
// Create secret for web token and export it
var secret = uuid.v1();
exports.secret = secret;
//Start express
var app = express();

//read the certificates for https
var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    requestCert: false,
    rejectUnauthorized: false
}

var queries = require("./modules/queries");
var person = require("./modules/person");
var user = require("./modules/user");
var database = require("./modules/database");
var mysql = require("./modules/mysql");

//node service settings
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
//====================MIDDLEWARES==================================================
// express session middleware
app.use(session({
    secret: uuid.v1(),
    cookie: {maxAge: 3600000},
    resave: true,
    saveUninitialized: true
}));
// body-parser.json() middleware parses the json object from http POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Define middleware for static (.html, .css, .js) files that are loaded by browser
// when parsing index.html
app.use('/', express.static(path.join(__dirname, '../frontend/views')));
app.use('/frontend/directives',express.static(path.join(__dirname, '../frontend/directives')));
app.use('/frontend/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/frontend/lib', express.static(path.join(__dirname, '../frontend/lib')));
app.use('/frontend/modules', express.static(path.join(__dirname, '../frontend/modules')));
app.use('/frontend/controllers', express.static(path.join(__dirname, '../frontend/controllers')));
app.use('/frontend/factories', express.static(path.join(__dirname, '../frontend/factories')));
app.use('/friends', user);
app.use(function (req, res, next) {
    //console.log(req.session);
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // check if there was a token
    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
           if (err) {
               return res.status(401).send;
           } else {
               req.decoded = decoded;
               //console.log(req.decoded);
           } 
        });
    } else {
        res.status(403).send;
    }
    //console.log(token);
    next();
});
//====================REST API MIDDLEWARE==========================================
app.use('/persons', person);

//====================ROUTERS======================================================
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});
// This router checks whether client is logged in or not
app.get('/isLogged', function(req, res){
    // User is logged in if session contains username attribute
    if (req.session.username) {
        res.status(200).send(['Ok']);
    } else {
        res.status(401).send(['Unauthorized']);
    }
});
//Start https service
https.createServer(options, app).listen(app.get('port'), app.get('ip'), function() {
    console.log("Express server started");
});
//Make express to listen to port 3000
//app.listen(3000);