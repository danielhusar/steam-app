'use strict';

var items [];

module.exports = function (app) {
	app.service('BasketService', function (UserDetailsService) {

		return {
			get: function () {
				return items;
			}
		};
	});
};
