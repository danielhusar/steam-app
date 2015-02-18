'use strict';

var _ = require('lodash');
var gui = global.window.nwDispatcher.requireNwGui();

module.exports = function (app) {
	app.directive('item', function (BuyService) {
		return {
			restrict: 'E',
			templateUrl: './public/_item.html',
			scope: {
				data: '='
			},
			link: function ($scope, element) {

				$scope.url = function (url) {
					gui.Shell.openExternal(url);
				};

				$scope.buy = function (item) {
					BuyService.buy(_.clone(item, true));
					$scope.data.status = 'buying';
				};
			}
		};
	});
};
