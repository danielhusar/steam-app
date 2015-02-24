'use strict';

var escapeStringRegexp = require('escape-string-regexp');

module.exports = function (app) {
	app.service('SanitizeFactory', function () {

		function sanitizeName (name) {
			return name.replace(/™/gi, '').replace(/^\,|\,$/g, '');
		}

		return {
			name: sanitizeName,

			regexp: function (name) {
				return new RegExp(escapeStringRegexp(sanitizeName(name)).replace(/\,/gi, '|'), 'gi');
			}
		};

	});
};
