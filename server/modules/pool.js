var pg = require('pg');


var config = {
	database: 'betelgeuse', //the name of the database
	host: 'localhost', //WHERE in the web does that information live
	port: 5432, //POSTGRES default port is 5432 - WHERE your DB is located
	max: 10, //The number of connections allowed at a time
	idleTimoutMillis: 30000 //30 seconds to try to connect
}

module.exports = pg.Pool(config);
