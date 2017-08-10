var express = require('express');
var bodyParser = require('body-parser');
var message = require('./routes/message.js');

var app = express();

var port = 5000;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/message', message);

app.listen(port, function() {
	console.log('listening on port', port);
});
