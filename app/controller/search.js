'use strict';

var _ = require('lodash');
var $ = require('../lib/query');

module.exports = function (app) {

	var searchInterval;
	var settingsInterval;
	var interval = false;

	app.controller('SearchController', function ($scope, $interval, SettingsService, SearchService) {
		$scope.nav = 'search';
		$('[data-page]').setAttribute('data-page', 'search');
		$scope.settings = SettingsService.search.get();

		$scope.$watch('settings', _.debounce(function (data) {
			SettingsService.search.set(data);
		}, 1000), true);

		// Angular view stop updating when changing routes and $interval is in progress so restart it
		if (interval) {
			clearInt();
			startInt();
		}

		$scope.start = startInt;
		$scope.stop = clearInt;

		function startInt () {
			$scope.interval = interval = true;

			searchInterval = $interval(function () {
				SearchService.get($scope.settings);
			}, $scope.settings.rate);

			settingsInterval = $interval(function () {
				$scope.settings = SettingsService.search.get();
			}, 500);
		}

		function clearInt () {
			$scope.interval = interval = false;
			$interval.cancel(searchInterval);
			$interval.cancel(settingsInterval);
		}

	});
};
