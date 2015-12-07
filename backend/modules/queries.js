var db = require("./database");

// getAllPersons hakee kaikki dokumentit person-collectionista
// exports tuo sen käytettäväksi muihin moduleihin
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
// saveNewPerson tallettaa uuden henkilön tiedot person-kokoelmaan
exports.saveNewPerson = function (req, res) {
    var personTemp = new db.Person(req.body);
    //Tallennetaan kantaan
    personTemp.save(function (err, ok) {
        if (err) {
            res.send(err.message);
        } else {
            db.Friends.update({username: req.body.user}, 
                              {$push:{'friends': personTemp._id}},
                              function(err, model){
                      
            res.send("Friend added");
            });
        }
    });
}
// Poistetaan henkilön tiedot kannasta
exports.deletePerson = function (req, res) {
    //req.params.id on muotoa id=xxxx, jolloin pitää leikata id= pois
    var id = req.params.id.split("=")[1];
    db.Person.remove({_id: id}, function (err) {
        if (err) {
            res.send(err.message);
        } else {
            res.send("Person removed succesfully!");
            // Poista henkilö myös käyttäjän friends-listalta
            db.Friends.update({username: req.body.user},
                              {$pull:{'friends': id}},
                              function(err, model) {
                
            });
            //res.redirect('/');
        }
    });
}
// Päivitetään henkilön tiedot
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

// Etsitään nimen perusteella kaikki dokumentit joiden name sisältää nimen
exports.searchByName = function (req, res) {
    var name = req.params.name.split("=")[1];
    var uname = req.params.username.split("=")[1];
   // console.log("NIMI: " + name);
    //console.log("USER: " + uname);
    //db.Person.find({name: {'$regex': name, '$options': 'i'}}, function (err, data) {
    db.Friends.find({username:uname}).
        populate({path:'friends',match:{name:{'$regex': name, '$options':'i'}}}).
            exec(function(err,data){
        if (err) {
            res.send(err.message);
        } else {
            //console.log("Found!" + data);
            res.send(data[0].friends);
        }
    });
    //}).sort({name: 1});
}

// Add new user
exports.registerFriend = function (req, res) {
    var friend = new db.Friends(req.body);
    friend.save(function (err) {
        if (err) {
            res.send({status: "Registration failed. Please use another username."});
        } else {
            res.send({status: "Registration successful!"});
        }
    });
}
// check if username and password exist
exports.loginFriend = function (req, res) {

    db.Friends.find({username: req.body.username, password: req.body.password}, function (err, data) {
        if (err) {
            res.status(502).send({status: err.message});
        } else {
            // data.length =< 0 means wrong username or password
            if (data.length > 0) {
                res.status(299).send({status: "Ok"});
            } else {
                res.status(401).send({status: "Wrong username or password"});
            }
        }
    });
}
// Haetaan käyttäjän ystävät friends-collectionista
exports.getFriendsByUsername = function (req, res) {
    var uname = req.params.username.split("=")[1];
    //console.log("User: " + uname);
    db.Friends.find({username: uname}).populate("friends").exec(function (err, data) {
        //console.log("löyty: " + data[0]);
        res.send(data[0].friends);
    });
}