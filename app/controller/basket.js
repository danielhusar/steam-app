'use strict';

var $ = global.window.jQuery;

module.exports = function (app) {
	app.controller('BasketController', function ($scope, BuyService) {
		$scope.nav = 'basket';
		$('[data-page]').attr('data-page', 'basket');

		$scope.items = BuyService.get();

	});
};
