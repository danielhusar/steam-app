'use strict';

var $ = global.window.jQuery;

module.exports = function (app) {

	var basketInterval;

	app.controller('BasketController', function ($scope, BuyService, $interval) {
		$scope.nav = 'basket';
		$('[data-page]').attr('data-page', 'basket');

		$scope.items = BuyService.get();

		$scope.clear = function () {
			$scope.items = BuyService.clear();
		};

		basketInterval = $interval(function () {
			$scope.items = BuyService.get();
		}, 2000);

		$scope.$on('$routeChangeStart', function () {
	  	$interval.cancel(basketInterval);
		});

	});
};
