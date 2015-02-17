'use strict';

var db = require('../lib/db.js')('user');

module.exports = {
	save: function (data) {
		return db.user.save(data);
	},

	get: function () {
		return db.user.findOne({'uid' : 'user'});
	},

	update: function (data, options) {
		options = options ? options : {};
		return db.user.update({'uid' : 'user'}, data, options);
	},

	seeds: function () {
		if (db.user.count() === 0) {
			return db.user.save({
				'steamLogin': '76561198058604396%7C%7C5CF1633B6BBD5EE3A03CBDE7291C0AE1320C5753',
				'sessionid': '',
				'currency': 3,
				'country': 'english',
				'uid': 'user'
			});
		}
	}
};
