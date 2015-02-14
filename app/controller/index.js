'use strict';

module.exports = function (app) {

	var items = [];

	app.controller('IndexController', function ($scope, $interval, UserDetailsService, NewlyService) {
		$scope.nav = 'index';
		$scope.items = items;

		UserDetailsService.get().then(function (data) {
			$scope.user = data;
		});

		//$interval(function () {
			NewlyService.get().then(function (data) {
				items = data.concat(items);
				$scope.items = items;
			});
		//}, 1000);


	});
};

