var express = require('express');
var html = require('html');
var path = require("path");
var db = require('./public/app.js');
var fs = require('fs');
var port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
var app = express();


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
// app.use(bodyparser);
// app.get('/', function (req,res) {
// res.status(200).send()
// })

///////////////////////////////////
/////////BOOKS/////////////////////
///////////////////////////////////

app.get('/data', function (req,res,next) {
	db.books.find({},function (err, data){
		if (err) {
			res.status(500);
		} else {
			// console.log(data);
			res.status(200).send(data);
		}	
	});
});

app.post('/data', function (req,res,next) {
	var book = new db.books(req.body);
	book.save(function (err, book) {
		console.log('DB ERROR /book post',err, book)
	});
	res.status(200).send();

});

app.post('/dataUpdate', function (req,res,next) {
	console.log('attempting to update book', req.body.title, req.body.price, req.body.quantity);
	db.books.update({'title' : req.body.title}, { $set : {'price': req.body.price, 'quantity': req.body.quantity}}, function(err,data){
		console.log('after update callback.  ERR', err)
	})
	res.status(200).send();
});

app.post('/dataDelete', function (req,res,next) {
	console.log('attempting to delete book', req.body.title);
	db.books.remove({'title' : req.body.title}, function(err,data){
		console.log('after update callback.  ERR', err)
	})
	res.status(200).send();
});

	/////////////////////////////////////
	//////////USERS//////////////////////
	/////////////////////////////////////
app.post('/auth', function (req,res) {
	db.users.find(req.body, function (err, data) {
		res.status(200).send(data);
	})
})


app.post('/user', function (req,res) {
	var user = new db.users(req.body);
	console.log(req.body)
	user.save(function (err, user) {
		console.error('\n\nDB ERROR /user post', user, err)
	})
	res.status(200).send();
})


// app.get('/public/bookstore', function (req,res) {
// 	res.body=angular;
// 	res.end();
// });

// app.get('/public/bookstore', function (req,res) {
// 	console.log('getting it bookstore');
// 	fs.readFile(__dirname + '/public/bookstore.js', function (err,data) {
// 		if(err) {
// 			console.log('bookstore error',err)
// 		} else {
// 			// data = JSON.parse(data);
// 			console.log('no err', data)
// 			res.body=angular;
// 			res.end();
// 		}
// 	})
// });

// app.get('/angular', function (req,res) {
// 	console.log('getting it');
// 	fs.readFile(__dirname + '/angular.js', function (err,data) {
// 		if(err) {
// 			console.log(err)
// 		} else {
// 			// data = JSON.parse(data);
// 			console.log('no err', data)
// 			res.body=(data);
// 			res.end();
// 		}
// 	})
// });
// app.get('/angular-route', function (req,res) {
// 	console.log('getting it');
// 	fs.readFile(__dirname + '/angular-route.js', function (err,data) {
// 		if(err) {
// 			console.log(err)
// 		} else {
// 			// data = JSON.parse(data);
// 			console.log('no err', data)
// 			res.body=data;
// 			res.end();
// 		}
// 	})
// });
// app.get('/bootstrap', function (req,res) {
// 	console.log('getting it');
// 	fs.readFile(__dirname + '/bootstrap.min.css', function (err,data) {
// 		if(err) {
// 			console.log(err)
// 		} else {
// 			// data = JSON.parse(data);
// 			console.log('no err', data)
// 			res.body=data;
// 			res.end();
// 		}
// 	})
// });
// app.get('/main', function (req,res) {
// 	console.log('getting it');
// 	fs.readFile(__dirname + '/public/main.css', function (err,data) {
// 		if(err) {
// 			console.log(err)
// 		} else {
// 			// data = JSON.parse(data);
// 			console.log('no err', data)
// 			res.body=data;
// 			res.end();
// 		}
// 	})
// });


app.listen(port);