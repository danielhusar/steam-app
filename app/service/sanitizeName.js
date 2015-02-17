'use strict';

module.exports = function (app) {
	app.service('SanitizeNameService', function (UserDetailsService) {

		return function (name) {
			return name.replace(/™/gi, '');
		};

	});
};
