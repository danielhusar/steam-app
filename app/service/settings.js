'use strict';

var settings = require('../model/settings.js');

module.exports = function (app) {
	app.service('SettingsService', function () {
		return {
			get: function() {
				return settings.get();
			}
		};
	});
};
