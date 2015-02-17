'use strict';

var $ = global.window.jQuery;
var gui = global.window.nwDispatcher.requireNwGui();
var win = gui.Window.get();
var items = [];
var buy = '$J.ajax({ \
							url:"https://steamcommunity.com/market/buylisting/{%1}", \
							type:"POST", \
							data: { \
								currency: g_rgWalletInfo.wallet_currency, \
								fee: {%4}, \
								quantity: 1, \
								sessionid: g_sessionID, \
								subtotal: {%3}, \
								total: {%2} \
						}, \
						crossDomain: true, \
						xhrFields: { \
							withCredentials: true \
						} \
					});';

module.exports = function (app) {
	app.service('BuyService', function (UserDetailsService, FilterItemsService) {

		return {
			buy: function (item) {
				console.log(item);
				items.push(item);
				FilterItemsService.set(item.id);
				win.eval(
					$('#ifr')[0],
					buy.replace('{%1}', item.id)
						 .replace('{%2}', item.priceFee * 100)
						 .replace('{%3}', item.priceNoFee * 100)
						 .replace('{%4}', (item.priceFee - item.priceNoFee) * 100)
				);
			},

			get: function () {
				return items;
			}
		};

	});
};
