'use strict';

module.exports = function (app) {
	app.service('SanitizeNameFactory', function (UserDetailsService) {

		return function (name) {
			return name.replace(/™/gi, '').replace(/^\,|\,$/g, '');
		};

	});
};
