var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
		price: Number
	});

	var UserSchema = mongoose.Schema({
		username: {type:String, index: {unique: true}},
		messages: [MessageSchema]
	});

	var User = mongoose.model('User', UserSchema);
	var Book = mongoose.model('Book', BookSchema);
	
	// [
 //  {title:'book1',author:'daniel', price:4.99},
 //  {title:'book2',author:'karun', price:4.99},
 //  {title:'book3',author:'jaun', price:4.99},
 //  {title:'book4',author:'blain', price:4.99},
 //  {title:'book5',author:'sola', price:4.99},
 //  {title:'book6',author:'nick', price:4.99},
 //  {title:'book7',author:'jon', price:4.99}
 //  ].forEach(function(newBook) {
	// 	new Book ({ title : newBook.title, author : newBook.author, price : newBook.price }).save();
 //  });

  console.log('just checking')
module.exports = {
	books: Book,
	users: Users
};




