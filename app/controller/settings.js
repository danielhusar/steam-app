'use strict';

var settings = require('../model/settings.js');

module.exports = function (app) {
	app.controller('SettingsController', function ($scope, SettingsService, UserDetailsService) {

		$scope.nav = 'settings';
		$scope.settings = SettingsService.get();

		UserDetailsService.get().then(function (data) {
			$scope.user = data;
		});


		$scope.save = function () {

			UserDetailsService.get($scope.settings.steamLogin)
				.then(function (data) {
					$scope.error = false;
					$scope.user = data;
					$scope.settings.sessionid = data.sessionID;
					settings.update({
						'steamLogin': $scope.settings.steamLogin,
						'sessionid': data.sessionID
					});
				}, function(reason) {
					$scope.error = true;
					$scope.user = {};
					$scope.settings.sessionid = '';
					settings.update({
						'steamLogin': $scope.settings.steamLogin,
						'sessionid': ''
					});
				});

		};

	});
};
