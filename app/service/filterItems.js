'use strict';

var escapeStringRegexp = require('escape-string-regexp');

module.exports = function (app) {
	app.service('FilterItemsService', function () {
		return function (data, game, items) {

			var regexp = new RegExp(escapeStringRegexp(items).replace(/^\,|\,$/g, '').replace(/\,/gi, '|'), 'gi');

			return data.filter(function (item) {
				var ret = true;

				if (item.game !== game || !item.name.match(regexp)) {
					ret = false;
				}

				return ret;
			});
		};
	});
};
