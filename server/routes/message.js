var express = require('express');
var router = express.Router();

var messages = [];


router.post('/newMessage', function(req, res){
	console.log('message post was hit!');
	messages.push(req.body);
	console.log(messages);
	res.sendStatus(201);
});

router.get('/', function(req, res) {
    console.log('message router was hit');
	res.send(messages);
});

module.exports = router;