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
        //console.log(error);
        //console.log(results);
        //console.log(fields);
    });
}

exports.loginMySqlProc = function (req, res) {
    connection.query('CALL getLoginInfo(?, ?)', [req.body.username, req.body.password], function (error, results, fields) {
        if (error) {
            res.status(502).send({status: err_message});
        } else {
            var test = results[0];
            if (test.length > 0) {
                req.session.username = test[0].username;
                req.session.userid = test[0].user_id;
                //Create the token
                var token = jwt.sign(results, server.secret, {expiresIn: '2h'});
                res.status(200).send({status: "Ok", secret: token});
            } else {
                res.status(401).send({status: "Wrong username or password"});
            }
        }
    });
}

exports.getFriendsForUser = function (req, res) {
    connection.query('CALL getFriendsByUsername(?)',[req.session.username], function ( error, results, fields) {
        if (results[0].length > 0 ) {
            data = results[0];
            res.send(data);
        } else {
            res.redirect('/');
        }
        
    });
}

exports.registerMySql = function (req, res) {
    //console.log(req.body);
    connection.query('CALL addNewUser(?, ?)', [req.body.username, req.body.password], function ( error, results, fields){
        if (error) {
            res.status(502).send({status: "Registration failed. Please use another username."});
        } else {
            res.status(200).send({status: "Registration successful!"});
        }
    });
}

exports.addFriendMySql = function (req, res) {
    
    connection.query('CALL addNewFriend(?, ?, ?, ?, ?)', [req.body.name, req.body.address, req.body.age, req.body.email, req.session.userid], function (error, results, fields) {
        if(error){
                res.status(500).json({message:'Fail'});
            }else{
                
                res.status(200).json({data: results[0]});
            }
    
    });
}

exports.searchFriendsMySql = function (req, res) {
    connection.query('CALL searchFriendByName(?)', [req.query.name], function (error, results, fields) {
        data = results[0];
        res.send(data);
    });
}

exports.deleteUserMysql = function (req, res) {
    var toDelete = [];
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
    
    var query = "";
    
    for(var i = 0; i < toDelete.length; i++){
        
        query += "DELETE FROM friend WHERE _id=" + toDelete[i] + ";";
    }
    
    connection.query(query,[],function(error,results,fields){
        
        if(error){
     
            res.status(500).send({message:error});
        }else{
            res.status(200).send({message:'Delete success'});
        }
    });
}

exports.updateFriendMysql = function (req, res) {
    console.log("Dataa: " + req.body.name + " ja: " + req.body.id);
    connection.query('CALL upDateFriendInfo(?, ?, ?, ?, ?)', [req.body.id, req.body.name, req.body.address, req.body.age, req.body.email], function (error, results, fields) {
         if(error){
                res.status(500).json({message:'Fail'});
            } else {
                console.log("HereXXX");
                res.status(200).json({message: 'Data updated'});
            }
    });
}