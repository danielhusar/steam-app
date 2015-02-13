'use strict';

var db = require('../lib/db.js')('settings');

module.exports = {
	save: function (data) {
		return db.settings.save(data);
	},

	get: function () {
		return db.settings.findOne({'uid' : 'settings'});
	},

	update: function (data, options) {
		options = options ? options : {};
		return db.settings.update({'uid' : 'settings'}, data, options);
	},

	seeds: function () {
		if (db.settings.count() === 0) {
			return db.settings.save({
				'steamLogin': '',
				'sessionid': '',
				'currency': 3,
				'uid': 'settings'
			});
		}
	}
};
