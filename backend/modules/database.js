var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/oma', connectionStatus);

// Connection callback for error and ok cases
function connectionStatus(err, ok) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("We're connected!");
    }
}

var User = mongoose.model('User', {
    username: {type: String, unique: true},
    password: String,
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person'}]
});

var Person = mongoose.model('Person', {
    name: String,
    address: String,
    age: {type: Number},
    email: { type: String, default: "Not set" }
    }, 'person');

//exports-objektin avulla data voidaan paljastaa muille moduleille 
exports.Person = Person;
exports.Friends = User;

exports.myFunction = function() {
    console.log("This");
}
