'use strict';

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
			}
		};
	});
};
