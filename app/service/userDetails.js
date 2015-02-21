'use strict';

module.exports = function (app) {

	var details = {};

	app.service('UserDetailsService', function ($q, SettingsService) {

		return {

			get: function () {
				if (!details.name) {
					details = SettingsService.user.get();
					return details;
				} else {
					return details;
				}
			},

			clearCache: function () {
				details = {};
			},

			currency: function (id) {
				var config = {
					1: 'USD',
					2: 'GBP',
					3: '€'
				};

				return config[id] || config[3];
			}

		};
	});
};
