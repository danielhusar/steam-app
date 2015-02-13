'use strict';

var db = require('../lib/db.js')('newly');

module.exports = {
	save: function (data) {
		return db.newly.save(data);
	},

	get: function () {
		return db.newly.findOne({'uid' : 'newly'});
	},

	update: function (data, options) {
		options = options ? options : {};
		return db.newly.update({'uid' : 'newly'}, data, options);
	},

	seeds: function () {
		if (db.newly.count() === 0) {
			return db.newly.save({
				'search': '',
				'rate': '',
				'autobuy': [
					{
						'name': '',
						'price': ''
					},
					{
						'name': '',
						'price': ''
					},
					{
						'name': '',
						'price': ''
					}
				],
				'uid': 'newly'
			});
		}
	}
};
