// ## node HTTP module craete server

const http = require('http');

// use the http module to create webserver with .craeteServer()
// in the createServer function we need to specify the req -> contain props of the incoming req
// also the response contain the props from the response we are sending back from the webserver
const server = http.createServer((res, req) => {
	//craete array of movies with objects
	const movies = [
		{ id: 1, name: 'some Movie' },
		{ id: 2, name: 'some Movi222e' },
		// we can send this data from the object to the user
	];
	//check req of url equals to / = homepage
	if (req.url == '/') {
		// we send a res to the user (write)
		res.write('Welcome to the http module');
		res.end(); //this tells webserver we are done writing
	}

	// setup the route to send the data
	if (req.url == '/api/movies') {
		// write response
		res.write(JSON.stringify(movies));
		res.end();
	}
});

// using the server const object we can listen a req to the given port
// the port we listen to is 3000
// second param is a function where we log a statement that the server is running
server.listen(3000, () => {
	console.log('Web server is running on part 3000');
});

// ### Node Event Module

// // eventClass
// const EventEmitter = require('events');

// // create instance of the class using new keyword
// const emitter = new EventEmitter();

// // method .on() is used to register an event
// // 1st parm : name of event
// // 2nd param : function, this functino will be triggered when event is raised
// emitter.on('greeting', (arg) => {
// 	console.log('This is the event class', arg.name);
// });

// // .emit() is a method that is use to trigger or raise events
// // 1st param: name of the event

// // pass params to event
// emitter.emit('greeting', { name: 'Random' });

// ### node File System

// const fs = require('fs');

// //example of readFile to read the file.
// // first param is route to the file
// // second param is callback with error and data that is been read
// fs.readFile('./test.txt', (err, data) => {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// 	// data only is buffer (encoded form of the data of the test file)
// 	// .toString() convert file to strings
// 	console.log(data.toString());
// });
