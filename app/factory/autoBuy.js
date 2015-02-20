'use strict';

var escapeStringRegexp = require('escape-string-regexp');
var $ = global.window.jQuery;
var _ = require('lodash');
var buyed = [];

module.exports = function (app) {
	app.factory('AutoBuyFactory', function (SanitizeNameFactory, SettingsService, BuyService) {

		function buy (item, namespace) {
			var settings = (SettingsService[namespace].get());
			settings.autobuy.forEach(function(el ,index){
				var regexp = new RegExp(escapeStringRegexp(SanitizeNameFactory(el.name)), 'gi');
				var price = Number(el.price);
				var quantity = Number(el.quantity);

				if ( item.name.match(regexp) && (quantity > 0) && (item.priceFee <= price) && (buyed.indexOf(item.id) === -1) ) {
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
