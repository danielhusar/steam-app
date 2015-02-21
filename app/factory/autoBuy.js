'use strict';

var escapeStringRegexp = require('escape-string-regexp');
var _ = require('lodash');
var buyed = [];

module.exports = function (app) {
	app.factory('AutoBuyFactory', function (SanitizeNameFactory, SettingsService, BuyService) {

		function buy (item, namespace) {
			var settings = SettingsService[namespace].get();

			settings.autobuy.forEach(function(el ,index){
				var regexp = new RegExp(escapeStringRegexp(SanitizeNameFactory(el.name)).replace(/\,/gi, '|'), 'gi');
				var price = Number(el.price);
				var quantity = Number(el.quantity);

				if ( (buyed.indexOf(item.id) === -1) && (quantity > 0) && item.name.match(regexp)  && (item.priceFee <= price)) {
					buyed.push(item.id);
					BuyService.buy(_.clone(item, true));
					settings.autobuy[index].quantity = quantity - 1;
					SettingsService[namespace].set(settings);
				}
			});
		}

		return {
			buy: buy
		};
	});
};
