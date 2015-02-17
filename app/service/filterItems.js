'use strict';

var escapeStringRegexp = require('escape-string-regexp');
var blacklist = [];

module.exports = function (app) {
	app.service('FilterItemsService', function (SanitizeNameService) {

		function filter (data, game, items) {
			var regexp = new RegExp(escapeStringRegexp(SanitizeNameService(items)).replace(/^\,|\,$/g, '').replace(/\,/gi, '|'), 'gi');

			return data.filter(function (item) {
				var ret = true;

				if (game && item.game !== game) {
					ret = false;
				}

				if (items && !item.name.match(regexp)) {
					ret = false;
				}

				if (blacklist.indexOf(item.id) !== -1) {
					ret = false;
				}

				return ret;
			});
		}

		return {
			filter: filter,

			set: function (id) {
				return blacklist.push(id);
			}
		};
	});
};
