'use strict';

module.exports = function (app) {
	app.controller('BasketController', function ($scope, UserDetailsService) {
		$scope.nav = 'basket';

		UserDetailsService.get().then(function (data) {
			$scope.user = data;
		});

	});
};
