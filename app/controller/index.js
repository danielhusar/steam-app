'use strict';

var _ = require('lodash');
var $ = require('../lib/query');

module.exports = function (app) {

	var newlyInterval;
	var settingsInterval;
	var interval = false;

	app.controller('IndexController', function ($scope, $interval, SettingsService, UserDetailsService, NewlyService) {
		$scope.nav = 'index';
		$('[data-page]').setAttribute('data-page', 'index');
		$scope.settings = SettingsService.newly.get();
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
			newlyInterval = $interval(function () {
				NewlyService.get($scope.settings).then(function (data) {
					$scope.items = data;
				});
			}, $scope.settings.rate);

			settingsInterval = $interval(function () {
				$scope.settings = SettingsService.newly.get();
			}, 2000);
		}

		function clearInt () {
			$scope.interval = interval = false;
			$interval.cancel(newlyInterval);
			$interval.cancel(settingsInterval);
		}

		// No need to update those when we are out of view
		$scope.$on('$routeChangeStart', function () {
	  	$interval.cancel(settingsInterval);
		});

	});
};

