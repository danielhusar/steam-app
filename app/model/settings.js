'use strict';

var db = require('../lib/db.js')('settings');

module.exports = {
	save: function (data) {
		return db.settings.save(data);
	},

	find: function () {
		return db.settings.find();
	},

	update: function (id, data) {

	}
};
