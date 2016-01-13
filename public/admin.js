(function () {

	angular.module('admin', [])

	.controller('AdminController', function ($scope, $http, $route) {
		$scope.addBook = function (book) {
			console.log("adminctrl BOOK: ",book);
			// post book to the db
			return $http.post('/data', book).success(function (data,status){
				console.log(data,status);
		    $route.reload();

			});
		};

		$scope.updateBook = function (book) {
			console.log("adminctrl updateing the BOOK: ", book);
			// post book to the db
			return $http.post('/dataUpdate', book).success(function (data,status){
				console.log('book update',data,status);
		    $route.reload();

			});
		};
	$scope.deleteBook = function (book) {
			console.log("adminctrl deleteing the BOOK: ", book);
			// post book to the db
			if (confirm('are you sure you want to delete the book?')) {
				return $http.post('/dataDelete', book).success(function (data,status){
					console.log('book update',data,status);
			    $route.reload();	
			});
			}
		};
	});


})();
