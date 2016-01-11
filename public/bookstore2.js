angular.module('bookstore', [])
.controller('BookStoreController', function ($scope) {
  $scope.books = [
  {title:'book1',author:'daniel', price:4.99},
  {title:'book2',author:'karun', price:4.99},
  {title:'book3',author:'jaun', price:4.99},
  {title:'book4',author:'blain', price:4.99},
  {title:'book5',author:'sola', price:4.99},
  {title:'book6',author:'nick', price:4.99},
  {title:'book7',author:'jon', price:4.99}
  ];
  $scope.addBook = function (book) {
    console.log(this.cart.findBook(book.title));
    if (!this.cart.findBook(book.title).length) {
      this.cart.books.push(book);
      book.count = 1;
    } else {
      book.count++
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
    price: function (){
      return this.total.toFixed(2);
    },
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
        return (book.title === search || book.author === search );
      });
    }

  };
});
// .factory('bookFactory', [function(){
//   return {

//   }
// }])