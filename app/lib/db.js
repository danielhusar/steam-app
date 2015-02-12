'use strict';

var db = require('diskdb');

module.exports = function (table) {
	return db.connect('db', [table]);
};
