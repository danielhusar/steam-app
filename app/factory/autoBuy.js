'use strict';

var buyed = [];

module.exports = function (app) {
	app.factory('AutoBuyFactory', function (SanitizeFactory, SettingsService, BuyService) {

		function buy (item, namespace) {
			var settings = SettingsService[namespace].get();

			settings.autobuy.forEach(function(el ,index){
				var regexp = SanitizeFactory.regexp(el.name);
				var price = Number(el.price);
				var quantity = Number(el.quantity);

				if (
						(buyed.indexOf(item.id) === -1) &&
						(quantity > 0) &&
						el.name &&
						item.name.match(regexp) &&
						(item.priceFee <= price)
					) {

					buyed.push(item.id);
					BuyService.buy(item);
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
