(function () {

	var app = angular.module('books', [])

	.directive( 'books' , function () {
		return {
			restrict: 'E',
			templateUrl: 'books.html'
		};
	});

})();
