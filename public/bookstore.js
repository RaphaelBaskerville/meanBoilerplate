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

.controller('BookStoreController', function ($scope, $http) {
 
  $http.get('/data').then(function(books){
    console.log(books)
    $scope.books = books.data;
  });
  
  $scope.addBook = function (book) {
    console.log(this.cart.findBook(book.title));
    if (!this.cart.findBook(book.title).length) {
      this.cart.books.push(book);
      book.count = 1;
    } else {
      book.count++;
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