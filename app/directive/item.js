'use strict';

var gui = global.window.nwDispatcher.requireNwGui();

module.exports = function (app) {
	app.directive('item', function () {
		return {
			restrict: 'E',
			templateUrl: './public/_item.html',
			scope: {
				data: '='
			},
			link: function ($scope) {
				$scope.buy = function (item) {
					console.log(item);
				};

				$scope.url = function (url) {
					gui.Shell.openExternal(url);
				};
			}
		};
	});
};
