(function () {

	angular.module('admin', [])

	.controller('AdminController', function ($scope, $http) {
		$scope.addBook = function (book) {
			console.log("adminctrl BOOK: ",book);
			// post book to the db
			return $http.post('/data', book).success(function (data,status){
				console.log(data,status);
			});
		};
	});

})();
