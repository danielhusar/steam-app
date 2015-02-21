'use strict';

var fs = require('fs');
var fmt = require('simple-fmt');
var gui = global.window.nwDispatcher.requireNwGui();
var win = gui.Window.get();

var $ = require('../lib/query');
var buy = fs.readFileSync('./app/lib/buy.txt').toString();
var items = [];
var iframe = $('#ifr');

module.exports = function (app) {
	app.service('BuyService', function (UserDetailsService, FilterItemsFactory) {

		return {
			buy: function (item) {

				FilterItemsFactory.set(item.id);
				var script = fmt(buy, item.id, (item.priceFee * 100).toFixed(0), (item.priceNoFee * 100).toFixed(0), ((item.priceFee - item.priceNoFee) * 100).toFixed(0) );

				win.eval(iframe, script);
				item.debug = script;

				// Did we buy it ?
				var interval = setInterval(function () {
					var status = iframe.contentWindow.buy[item.id.toString()];
					if (status) {
						clearInterval(interval);
						item.status = status.success  ? 'success' : 'error';
						if (item.error) {
							item.debug = item.debug + '\r\n\r\n' + JSON.stringify(status.error);
						}
					}
				}, 1000);

				// Timeout
				setTimeout(function () {
					clearInterval(interval);
				}, 15000);


				items.push(item);
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
