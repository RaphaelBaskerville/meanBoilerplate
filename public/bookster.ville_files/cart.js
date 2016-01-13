(function () {

	angular.module('cart', [])

	.directive( 'cart' , function () {
		return {
			restrict: 'E',
			templateUrl: 'cart.html'
		};
	})

})();
