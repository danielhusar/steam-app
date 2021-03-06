'use strict';

var user = require('../model/user.js');
var newly = require('../model/newly.js');
var search = require('../model/search.js');

module.exports = function (app) {
	app.service('SettingsService', function () {
		return {

			user: {
				get: user.get,
				set: user.update
			},

			newly: {
				get: newly.get,
				set: newly.update
			},

			search: {
				get: search.get,
				set: search.update
			}

		};
	});
};
