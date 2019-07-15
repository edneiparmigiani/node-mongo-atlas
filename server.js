console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-gnn8n.mongodb.net/test?retryWrites=true&w=majority"
const app = express();

// serve files from the public directory
app.use(express.static('public'));

// add a document to the DB collection recording the click event
app.post('/clicked', (req, res) => {
	const click = {clickTime: new Date()};
	console.log(click);

  	MongoClient.connect(uri, function(err, client) {
	   if (err) {
	   		console.log('error occurred while connecting to MongoDB Atlas...\n',err);
	   }
	   console.log('connected...');

		const collection = client.db("test").collection('clicks').save(click, (err, result) => {
		if (err) {
			return console.log(err);
		}
		
			console.log('click added to db');
			res.sendStatus(201);
		});

	   client.close();
	   console.log('closed...');
	});
});

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});