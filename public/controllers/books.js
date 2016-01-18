(function () {

	var app = angular.module('books', [])

	.directive( 'books' , function () {
		return {
			restrict: 'E',
			templateUrl: 'views/books.html'
		};
	});
})();
