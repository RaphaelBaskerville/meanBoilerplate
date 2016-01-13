angular.module('bookstore', ['ngRoute', 'cart', 'books', 'admin'])
.config(function ($routeProvider) {
  $routeProvider
  .when('/store', {
    templateUrl: 'mainstore.html',
    controller: 'BookStoreController'
  })
  .when('/admin', {
    templateUrl: 'admin.html',
    controller: 'AdminController'
  })
  .otherwise({
    templateUrl: 'signin.html',
    controller: 'BookStoreController'
  })
})

.controller('BookStoreController', function ($scope, $http, $location) {
 
  $http.get('/data').then(function(books){
    console.log(books)
    $scope.books = books.data;
  });
  $scope.signup = function (user) {
    console.log('signUPUPUP user: ',user);
    // post book to the db
    return $http.post('/user', user).success(function (data,status){
      console.log('user post success',data,status);
    });
  }
  $scope.signin = function (user) {
    console.log('signINININ user: ',user);
    // post book to the db
    return $http.post('/auth', user).then(function (data,status){
      console.log('user get success',data,status);
      // console.log('data',data.data[0].username === 'admin')
      if (data.data.length) {
        if (data.data[0].username === 'admin') {
          $location.path('/admin');
        } else { 
          console.log('logged in');
          user.auth = true;
          $location.path('/store');
        }

      } else {
        console.log('not logged in')
      }
    });
  }
  
  $scope.addBook = function (book) {
    console.log(this.cart.findBook(book.title));
    if (!this.cart.findBook(book.title).length && book.quantity > 0) {
      this.cart.books.push(book);
      book.count = 1;
      book.quantity--;
    } else {
      book.count++;
      book.quantity--;

    }
    this.cart.total += book.price;
  };
  $scope.toggleCart = function () {
    if (!this.showCart) {
      console.log('on',this.showCart);
      this.showCart = true;
    } else {
      console.log('off',this.showCart);
      this.showCart = false;
    }
  };
  $scope.cart = {
    total: 0,
    books:[],
    empty: function () {
      this.total = 0;
      this.books = [];
    },
    removeBook: function (index) {
      var book = this.books[index];
      this.total -= book.price;
      book.count--;
      book.quantity++
      if (book.count === 0) {
        this.books.splice(index,1);
      }
    },
    findBook: function (search) {
      return this.books.filter(function(book){
        return (book.title === search);
      });
    }

  };
})





// .factory('bookFactory', [function(){
//   return {

//   }
// }])