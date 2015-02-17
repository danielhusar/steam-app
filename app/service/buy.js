'use strict';

var escapeStringRegexp = require('escape-string-regexp');
var req = require('../lib/request.js');
var items = [];

module.exports = function (app) {
	app.service('BuyService', function (UserDetailsService, FilterItemsService) {

		function post () {

		}

		return {
			buy: function (item) {
				items.push(item);
				FilterItemsService.set(item.id);
			},

			get: function () {
				return items;
			}
		};

	});
};
