'use strict';

var $ = global.window.jQuery;

module.exports = function (app) {
	app.controller('SearchController', function ($scope, UserDetailsService) {
		$scope.nav = 'search';
		$('[data-page]').attr('data-page', 'search');

	});
};
