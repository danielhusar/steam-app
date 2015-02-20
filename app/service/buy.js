'use strict';

var fmt = require('simple-fmt');
var gui = global.window.nwDispatcher.requireNwGui();
var win = gui.Window.get();
var $ = global.window.jQuery;
var items = [];
var buy = 'window.buy = window.buy || {}; \
					 $J.ajax({ \
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
					}) \
					.done(function (data) { \
						window.buy[{0}] = { \
							success: data \
						} \
					}) \
				  .fail(function (err, text, jqXHR) { \
				  	window.buy[{0}] = { \
							err: err, \
							text: text, \
							jqXHR: jqXHR \
						} \
				  });';
var iframe = $('#ifr')[0];

module.exports = function (app) {
	app.service('BuyService', function (UserDetailsService, FilterItemsFactory) {

		return {
			buy: function (item) {
				items.push(item);
				FilterItemsFactory.set(item.id);
				var script = fmt(buy, item.id, item.priceFee * 100, item.priceNoFee * 100, ((item.priceFee - item.priceNoFee) * 100));
				//console.log(script);

				win.eval(iframe, script);

				// setInterval(function () {
				// 	console.log(iframe.contentWindow.buy);
				// }, 1000);

			},

			get: function () {
				return items;
			},

			clear: function () {
				items = [];
				return items;
			}
		};

	});
};
