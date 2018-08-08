var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var db;
if(process.env.ENV == 'test') {
	db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI_test');
} else {
	db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI')
}

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);

app.listen(port, function() {
	console.log('Running on port:' + port);
})

module.exports = app;
