'use strict';

var fs = require('fs');
var fmt = require('simple-fmt');
var _ = require('lodash');
var $ = require('../lib/query');
var buy = fs.readFileSync('./app/lib/buy.txt').toString();

var gui = global.window.nwDispatcher.requireNwGui();
var win = gui.Window.get();

var items = [];
var iframe = $('#ifr');

module.exports = function (app) {
	app.service('BuyService', function (UserDetailsService, FilterItemsFactory, config) {

		return {
			buy: function (originalItem) {
				var item = _.clone(originalItem, true);

				FilterItemsFactory.set(item.id);
				var script = fmt(buy, item.id, (item.priceFee * 100).toFixed(0), (item.priceNoFee * 100).toFixed(0), ((item.priceFee - item.priceNoFee) * 100).toFixed(0) );

				// Buy item in iframe
				if (!config.FAKEBUY) {
					win.eval(iframe, script);
				}

				item.debug = script;

				// Did we buy it ?
				var interval = setInterval(function () {
					var status = !config.FAKEBUY ? iframe.contentWindow.buy[item.id.toString()] : {success: true};
					if (status) {
						clearInterval(interval);
						clearTimeout(timeout);
						item.status = status.success  ? 'success' : 'error';
						if (item.error) {
							item.debug = item.debug + '\r\n\r\n' + JSON.stringify(status.error);
						}
					}
				}, 1000);

				// Timeout so we dont wait forever
				var timeout = setTimeout(function () {
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
