//Set up requirements
var express = require("express");
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

/*----------
SERVER SETUP
-----------*/
//Create an 'express' object
var app = express();
//Set the favicon
app.use(favicon(__dirname + '/public/media/favicon.ico'));
//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

// Enable json body parsing of application/json
// This will allow the server to  more easily read in the json data
app.use(bodyParser.json());

//Set a port value
var port = 3000;
// Start the server & save it to a var
var server = app.listen(port);
//Pass the server var as an arg to the 'io' init requirement
var io = require('socket.io')(server);
console.log('Express started on port ' + port);

/*-----
ROUTES
-----*/
//Main Page Route
app.get("/", function(req,res){
	res.render('index');
});

app.get("/sounds", function(req, res){
	res.render('sounds');
});

//Main Socket Connection
io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('sound', function (data) {
		//Will send to everyone except the sender
		socket.broadcast.emit('news', data);
		console.log(data);

		//Will send to everyone
		//io.emit('news', data);
  });
});