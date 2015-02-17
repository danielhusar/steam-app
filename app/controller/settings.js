'use strict';

module.exports = function (app) {
	app.controller('SettingsController', function ($scope, SettingsService, UserDetailsService) {

		$scope.nav = 'settings';
		$scope.settings = SettingsService.user.get();

		UserDetailsService.get().then(function (data) {
			$scope.user = data;
		});

		$scope.save = function () {

			console.log('sav');

			UserDetailsService.get($scope.settings.steamLogin)
				.then(function (data) {
					$scope.error = false;
					$scope.user = data;
					$scope.settings.sessionid = data.sessionID;

					SettingsService.user.set({
						'steamLogin': $scope.settings.steamLogin,
						'sessionid': data.sessionID
					});
				}, function(reason) {
					$scope.error = true;
					$scope.user = {};
					$scope.settings.sessionid = '';

					SettingsService.user.set({
						'steamLogin': $scope.settings.steamLogin,
						'sessionid': ''
					});
				});

		};

	});
};
