'use strict';

var _ = require('lodash');

module.exports = function (app) {
	app.service('SanitizeFactory', function () {

		function sanitizeName (name) {
			return _.trim(name.replace(/™/gi, ''), ',');
		}

		return {
			name: sanitizeName,

			regexp: function (name) {
				return new RegExp( _.escapeRegExp(sanitizeName(name)).replace(/\,/gi, '|'), 'gi' );
			}
		};

	});
};
