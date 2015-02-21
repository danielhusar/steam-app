'use strict';

var $ = require('../lib/query');

module.exports = function (app) {
	app.controller('SearchController', function ($scope, UserDetailsService) {
		$scope.nav = 'search';
		$('[data-page]').setAttribute('data-page', 'search');

	});
};
