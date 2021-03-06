var db = require("./database");
var jwt = require('jsonwebtoken');
var server = require('../server');

// getAllPersons fetches all data from person collection
// exports makes it usable in other modules
exports.getAllPersons = function (req, res) {
    db.Person.find(function (err, data) {
        if (err) {
            //console.log(err.message);
            res.send("Error in database");
        } else {
            res.send(data);
        }
    });
}
// saveNewPerson saves new person's information to person collection
exports.saveNewPerson = function (req, res) {
    var personTemp = new db.Person(req.body);
    //Save it to database
    personTemp.save(function (err, newData) {
        
        db.Friends.update({username:req.session.username},
                          {$push:{'friends':personTemp._id}},
                          function(err,model){
            
            if(err){
                res.status(500).json({message:'Fail'});
            }else{
                
                res.status(200).json({data:newData});
            }
        });
     
    });
}
// Remove person data from database
exports.deletePerson = function (req, res) {
    //req.params.id on muotoa id=xxxx, jolloin pitää leikata id= pois
    //var id = req.params.id.split("=")[1];
    var toDelete = [];
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
    db.Person.remove({_id:{$in:toDelete}}, function (err, data) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            
            // Delete person also from user's friends list
            db.Friends.update({username:req.session.kayttaja},{$pull:{'friends':{$in:toDelete}}},function(err,data){
            if (err) {
                res.status(500).send({message:err.message});
            } else {
                res.status(200).send("Person removed succesfully!");
            }
                
            });
            //res.redirect('/');
        }
    });
}
// Update person information
exports.updatePerson = function (req, res) {
    var updateData = {
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        email: req.body.email
    };
    db.Person.update({_id: req.body.id}, updateData, function (err) {
        //console.log("Here!" + req.body.name + " " + req.body.id);
        if (err) {
            res.send(err.message);
        } else {
            res.send("Person updated succesfully!");
        }
    });
}

// Search person by name
exports.findPersonsByName = function(req,res){

    var name = req.query.name;

    db.Friends.findOne({username:req.session.username}).
        populate({path:'friends',match:{name:{'$regex':'' + name,'$options':'i'}}}).
            exec(function(err,data){
        res.send(data.friends);
    });
    
}

// Add new user
exports.registerFriend = function (req, res) {
    var friend = new db.Friends(req.body);
    friend.save(function (err) {
        if (err) {
            res.status(502).send({status: "Registration failed. Please use another username."});
        } else {
            res.status(200).send({status: "Registration successful!"});
        }
    });
}
// check if username and password exist
exports.loginFriend = function(req,res){
    
    var searchObject = {
        username:req.body.username,
        password:req.body.password
    }
    //console.log(searchObject);
    //console.log(req.body);
    db.Friends.findOne(searchObject,function(err,data){
        
        if(err){
            res.status(502).send({status:err.message});
        } else {
            //console.log(data);
            //=< 0 means wrong username or password
            if(data){
                req.session.username = data.username;
                //Create web token
                var token = jwt.sign(data, server.secret, {expiresIn: '2h'});
                res.status(200).send({status:"Ok", secret: token});
            }
            else{
                res.status(401).send({status:"Wrong username or password"});
            }
            
        }
    });
}

// Get user's friends from friends collection
exports.getFriendsByUsername = function (req, res) {
    //var uname = req.params.username.split("=")[1];
    db.Friends.findOne({username: req.session.username}).
        populate('friends').exec(function (err, data) {
        //console.log(err);
        if (data) {
            //console.log("Here: " + data.friends);
            res.send(data.friends); 
        } else {
            res.redirect('/');
        }
    });
}