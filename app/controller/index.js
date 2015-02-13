'use strict';


module.exports = function (app) {
	app.controller('IndexController', function ($scope, UserDetailsService) {
		$scope.nav = 'index';

		UserDetailsService.get().then(function (data) {
			$scope.user = data;
		});

	});
};

