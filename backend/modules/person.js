var express = require("express");
var db = require("./queries");
var mysql = require("./mysql");

var router = express.Router();

// GET-requestien käsittely /persons-kontekstissa
router.get('/', function (req, res) {
    //db.getAllPersons(req, res);
    getFriendsForUserMySQL(req, res);
});
router.get('/search', function (req, res) {
    //db.findPersonsByName(req, res);
    mysql.searchFriendsMySql(req, res);
});
//router.get('/:username', function (req, res) {
//    db.getAllPersons(req, res);
//});
// POST-requestien käsittely /persons-kontekstissa
router.post('/', function (req, res) {
    //db.saveNewPerson(req, res);
    mysql.addFriendMySql(req, res);
});
// PUT-requestien käsittely /persons-kontekstissa
router.put('/', function (req, res) {
    //db.updatePerson(req, res);
    console.log("Updatea pukkaa!");
    mysql.updateFriendMysql(req, res);
});
// DELETE-requestin käsittely /persons-kontekstissa
router.delete('/', function (req, res) {
    //db.deletePerson(req, res);
    mysql.deleteUserMysql(req, res);
});

module.exports = router;