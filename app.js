var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = 5000;

var messages = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/message', function(req, res){
	console.log('message post was hit!');
	messages.push(req.body);
	console.log(messages);
	res.sendStatus(201);
});

app.listen(port, function() {
	console.log('listening on port', port);
});
