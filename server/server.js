var express = require('express');
var html = require('html');
var path = require('path');
var db = require('./app.js');
var fs = require('fs');
var Xray = require('x-ray');
var xray = new Xray();
var port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());

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
//////////////////////////////////////
////////// xray //////////////////////
//////////////////////////////////////
app.get('/popularBooks', function(req, res) {
  res.status(200)
    xray('http://www.amazon.com/gp/bestsellers/books/ref=sv_b_2', 'div.zg_itemWrapper', [{
          title: '.zg_title',
          author: '.zg_byline',
          price: '.price',
          image: 'img@src'
        }])
        .paginate('#zg_page2 a@href')
        .limit(2)
        .paginate('#zg_page3 a@href')
        .limit(2)
        .paginate('#zg_page4 a@href')
        .limit(2)
        .paginate('#zg_page5 a@href')
        .limit(2)
          .write().pipe(res)
})

app.listen(port);
