var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// specify which db to use and where it is.
mongoose.connect('mongodb://localhost/books');

var db = mongoose.connection;

db.on('error', console.error.bind(console, "Connected error"));

db.once('open', function (){

	console.log("we're connected");

});

	var BookSchema = mongoose.Schema({
		title: {type : String , index : {unique : true} },
		author: String,
		price: Number,
		quantity: Number
	});

	var UserSchema = mongoose.Schema({
		username: {type:String, index: {unique: true}},
		password: String
	});

	var User = mongoose.model('User', UserSchema);
	var Book = mongoose.model('Book', BookSchema);

  console.log('db is feeling good');

	module.exports = {
		books: Book,
		users: User
	};




