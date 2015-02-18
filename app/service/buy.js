'use strict';

var fmt = require('simple-fmt');
var gui = global.window.nwDispatcher.requireNwGui();
var win = gui.Window.get();
var $ = global.window.jQuery;
var items = [];
var buy = '$J.ajax({ \
							url:"https://steamcommunity.com/market/buylisting/{0}", \
							type:"POST", \
							data: { \
								currency: g_rgWalletInfo.wallet_currency, \
								fee: {3}, \
								quantity: 1, \
								sessionid: g_sessionID, \
								subtotal: {2}, \
								total: {1} \
						}, \
						crossDomain: true, \
						xhrFields: { \
							withCredentials: true \
						} \
					});';

module.exports = function (app) {
	app.service('BuyService', function (UserDetailsService, FilterItemsFactory) {

		return {
			buy: function (item) {
				items.push(item);
				FilterItemsFactory.set(item.id);
				var script = fmt(buy, item.id, item.priceFee * 100, item.priceNoFee * 100, ((item.priceFee - item.priceNoFee) * 100));
				console.log(script);

				win.eval(
					$('#ifr')[0],
					script
				);

			},

			get: function () {
				return items;
			}
		};

	});
};
