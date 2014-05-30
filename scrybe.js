var fs = require('fs')
	, http = require('http')
	, socketio = require('socket.io')
	, express = require('express')
	//MsTranslator Stuff
	, mstranslator = require('mstranslator')
	, users = []
	, allContacts = [];
	
// Create server and turn it on	
	var app = express();
	var server = http.createServer(app); 
	
	app.use(express.static(__dirname + "/public"));

	server.listen(8080, function(){
	console.log('listening at: http://localhost:8080');
});

// Turn on socket
socketio.listen(server).sockets.on('connection', function(socket) {
	listUsers();
	users.push(socket.id);
	socket.on('newUser', function(username) {
		socket.username = username;
			allContacts.push(socket.username);
			console.log(allContacts);
			
	});	
	function listUsers(){
	socket.emit('contacts', allContacts);
	}
	socket.on('message', function(msg) {
		console.log('Message Recieved: ' + socket.id, msg);
		socket.broadcast.emit('message', socket.username + msg);
	});
});
 
