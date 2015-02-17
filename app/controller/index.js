'use strict';

var _ = require('lodash');

module.exports = function (app) {

	var intervalPromise;
	var interval = false;

	app.controller('IndexController', function ($scope, $interval, SettingsService, UserDetailsService, NewlyService) {
		$scope.nav = 'index';
		$scope.settings = SettingsService.newly.get();
		UserDetailsService.get().then(function (data) {
			$scope.user = data;
		});

		$scope.interval = interval;
		$scope.items = NewlyService.cache();

		$scope.$watch('settings', _.debounce(function (data) {
			SettingsService.newly.set(data);
		}, 1000), true);

		// Angular view stop updating when changing routes and $interval is in progress so restart it
		if (interval) {
			clearInt();
			startInt();
		}

		$scope.start = function () {
			SettingsService.newly.set($scope.settings);
			startInt();
		};
		$scope.stop = clearInt;
		$scope.clear = function () {
			NewlyService.clearCache();
			$scope.items = NewlyService.cache();
		};

		function startInt () {
			$scope.interval = interval = true;
			intervalPromise = $interval(function () {
				NewlyService.get($scope.settings).then(function (data) {
					$scope.items = data;
				});
			}, $scope.settings.rate);
		}

		function clearInt () {
			$scope.interval = interval = false;
			$interval.cancel(intervalPromise);
		}

	});
};

