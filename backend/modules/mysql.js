var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../server');

//Define connection attributes for mysql server
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'friends_schema'
});

//Connect to mysql server
connection.connect(function (err) {
    if (err) {
        console.log('Could not connect to mysql server: ' + err.message);
    } else {
        console.log('Connected to mysql server:database friends_schema');
    }
});

//Check username and password from database
exports.loginMySql = function (req, res) {
    connection.query('SELECT * from user WHERE username=? AND pass=?', [req.body.username, req.body.password], function (error, results, fields){
        console.log(error);
        console.log(results);
        console.log(fields);
    });
}

exports.loginMySqlProc = function (req, res) {
    connection.query('CALL getLoginInfo(?, ?)', [req.body.username, req.body.password], function (error, results, fields) {
        if (error) {
            res.status(502).send({status: err_message});
        } else {
            if (results.length > 0) {
                req.session.kayttaja = results.username;
                //Create the token
                var token = jwt.sign(results, server.secret, {expiresIn: '2h'});
                res.status(200).send({status: "Ok", secret: token});
            } else {
                res.status(401).send({status: "Wrong username or password"});
            }
        }
    });
}