var express = require("express");
var db = require("./queries");

var router = express.Router();

// GET-requestien käsittely /persons-kontekstissa
router.get('/', function (req, res) {
    db.getAllPersons(req, res);
});
router.get('/:name/:username', function (req, res) {
    db.searchByName(req, res);
});
//router.get('/:username', function (req, res) {
//    db.getAllPersons(req, res);
//});
// POST-requestien käsittely /persons-kontekstissa
router.post('/', function (req, res) {
    db.saveNewPerson(req, res);
});
// PUT-requestien käsittely /persons-kontekstissa
router.put('/', function (req, res) {
    db.updatePerson(req, res);
});
// DELETE-requestin käsittely /persons-kontekstissa
router.delete('/:id', function (req, res) {
    db.deletePerson(req, res);
});

module.exports = router;