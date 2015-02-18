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
				currency: 3,
				country: 'IE',
				language: 'english',
				currencySign: '€',
				uid: 'user'
			});
		}
	}
};
