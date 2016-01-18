(function () {

	angular.module('cart', [])

	.directive( 'cart' , function () {
		return {
			restrict: 'E',
			templateUrl: 'views/cart.html'
		};
	})

})();
