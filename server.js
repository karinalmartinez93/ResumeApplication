var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('users',['users']);
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.get('/users', function(req, res){
      console.log("I recieved a GET request.");

      db.users.find(function(err, docs){
        console.log(docs);
        res.json(docs);
      });
});

app.post("/users", function(req, res){
  console.log(req.body);
  db.users.save(req.body, function(err, docs){
    res.json(docs);
  });
});

app.delete("/users/:id", function(req, res){
  var id = req.params.id;
  console.log(id);
  db.users.remove({_id:mongojs.ObjectId(id)}, function(err, docs){
    res.json(docs);
  });
});

app.get("/users/:id", function(req, res){
  var id = req.params.id;
  console.log(id);
  db.users.findOne({_id:mongojs.ObjectId(id)}, function(err, docs){
    res.json(docs);
  });
});

app.put('/users/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  if(req.body.type === 'Education'){
    db.users.findAndModify({
      query: {_id: mongojs.ObjectId(id)},
      update: {$set: {type: req.body.type, school: req.body.school, degree: req.body.degree, last_year: req.body.last_year}},
      new: true}, function (err, doc) {
        res.json(doc);
      }
    );
  } else if(req.body.type === 'Skill'){
    db.users.findAndModify({
      query: {_id: mongojs.ObjectId(id)},
      update: {$set: {type: req.body.type, skill: req.body.skill}},
      new: true}, function (err, doc) {
        res.json(doc);
      }
    );
  } else {
    db.users.findAndModify({
      query: {_id: mongojs.ObjectId(id)},
      update: {$set: {type: req.body.type, title: req.body.title, description: req.body.description}},
      new: true}, function (err, doc) {
        res.json(doc);
      }
    );
  }
});

app.listen(8080);
console.log("Server running on port 8080");


/*
  first run mongod from command line
  then run mongo navigate to contactlist
  then cd to contactlistapp
  then run node server.js
*/
