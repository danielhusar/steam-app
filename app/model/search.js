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
				'items': 'karambit',
				'rate': '500',
				'autobuy': {
					'price': '',
					'quantity': ''
				},
				'category': {
					'tag_CSGO_Type_Pistol': false,
					'tag_730_Type_CSGO_Type_SMG': false,
					'tag_730_Type_CSGO_Type_Rifle': false,
					'tag_730_Type_CSGO_Type_SniperRifle': false,
					'tag_730_Type_CSGO_Type_Shotgun': false,
					'tag_730_Type_CSGO_Type_Machinegun': false,
					'tag_730_Type_CSGO_Type_Knife': false
				},
				'exterior': {
					'tag_730_Exterior_WearCategory0': false,
					'tag_730_Exterior_WearCategory1': false,
					'tag_730_Exterior_WearCategory2': false,
					'tag_730_Exterior_WearCategory3': false,
					'tag_730_Exterior_WearCategory4': false,
					'tag_730_Exterior_WearCategoryNA': false
				},
				'uid': 'search'
			});
		}
	}
};
