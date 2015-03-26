'use strict';

var _ = require('lodash');
var $ = require('../lib/query');

module.exports = function (app) {
	app.controller('SearchController', function ($scope, SettingsService, SearchService) {
		$scope.nav = 'search';
		$('[data-page]').setAttribute('data-page', 'search');
		$scope.settings = SettingsService.search.get();

		$scope.$watch('settings', _.debounce(function (data) {
			SettingsService.search.set(data);
		}, 1000), true);

		$scope.start = function () {
			SearchService.get($scope.settings).then(function (data) {
				$scope.items = data;
			});
		};

	});
};
