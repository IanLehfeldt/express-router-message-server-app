var express = require('express');
var router = express.Router();
//We wanna pull from the same pool so that we are creating multiple pools
var pool = require('../modules/pool.js');

//our postgres module
//it isnt the database, its how we interact with our database -- how we make the CONNECTION

//Pool object that has a bunch of properties from config

//dont need the message array cuz we're working with DB
//var messages = [];


router.post('/', function(req, res){
	console.log('message post was hit!');
	// messages.push(req.body);
	// console.log(messages);
	//add an INSERT query
	//pool.query()
	pool.connect(function(errorConnectingToDatabase, client, done){
		if(errorConnectingToDatabase){
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			client.query('INSERT INTO messages (name, message) VALUES ($1, $2);', [req.body.name, req.body.message], function(errorMakingQuery, result){
				done();
				if (errorMakingQuery){
					console.log('Error making Query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.sendStatus(201);
				}
			});
		}
	});
});

router.get('/', function(req, res) {
	console.log('message router was hit');
	pool.connect(function(errorConnectingToDatabase, client, done){
		if(errorConnectingToDatabase) {
			//when connecting to DB failed!
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			//when connecting to DB worked!
			client.query('SELECT * FROM messages;', function(errorMakingQuery, result){
				done(); //If you dont do this, all the pool connections will still be outside of the pool. You need to say done(); to return each connection to the pool for other users
				if(errorMakingQuery) {
					console.log('Error making Query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.send(result.rows);
				}
			});
		}
	});
});

module.exports = router;