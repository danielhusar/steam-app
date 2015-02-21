'use strict';

var $ = require('../lib/query');

module.exports = function (app) {
	app.controller('SettingsController', function ($scope, SettingsService, UserDetailsService) {
		$scope.nav = 'settings';
		$('[data-page]').setAttribute('data-page', 'settings');

		$scope.settings = UserDetailsService.get();

		$scope.save = function () {
			var iframe = $('#ifr');

			$scope.settings = {
				currency: iframe.contentWindow.g_rgWalletInfo.wallet_currency,
				country: iframe.contentWindow.g_strCountryCode,
				language: iframe.contentWindow.g_strLanguage,
				currencySign: UserDetailsService.currency(iframe.contentWindow.g_rgWalletInfo.wallet_currency)
			};

			SettingsService.user.set($scope.settings);
			UserDetailsService.clearCache();

		};

	});
};
