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
				'items': 'knife,karambit,bayonet,awp,m4a4,m4a1,ak-47,glock-18',
				'game': 'Counter-Strike: Global Offensive',
				'rate': '500',
				'autobuy': [
					{
						'enable': false,
						'name': '',
						'price': ''
					},
					{
						'enable': false,
						'name': '',
						'price': ''
					},
					{
						'enable': false,
						'name': '',
						'price': ''
					}
				],
				'uid': 'newly'
			});
		}
	}
};
