'use strict';

var db = require('../lib/db.js')('search');

module.exports = {
	save: function (data) {
		return db.search.save(data);
	},

	get: function () {
		return db.search.findOne({'uid' : 'search'});
	},

	update: function (data, options) {
		options = options ? options : {};
		return db.search.update({'uid' : 'search'}, data, options);
	},

	seeds: function () {
		if (db.search.count() === 0) {
			return db.search.save({
				'items': 'http://steamcommunity.com/market/listings/730/Glock-18%20%7C%20Death%20Rattle%20%28Field-Tested%29',
				'rate': 500,
				'attempts': 10,
				'cookie': '',
				'uid': 'search'
			});
		}
	}
};
