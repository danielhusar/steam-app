'use strict';

module.exports = function (app) {
	app.controller('SearchController', function ($scope, UserDetailsService) {
		$scope.nav = 'search';

		UserDetailsService.get().then(function (data) {
			$scope.user = data;
		});

	});
};
