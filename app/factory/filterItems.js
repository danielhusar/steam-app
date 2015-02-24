'use strict';

var blacklist = [];

module.exports = function (app) {
	app.factory('FilterItemsFactory', function (SanitizeFactory) {

		function filter (data, game, items) {
			var regexp = SanitizeFactory.regexp(items);

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
