'use strict';

var _ = require('lodash');
var fmt = require('simple-fmt');
var cheerio = require('cheerio');
var req = require('../lib/request.js');

module.exports = function (app) {
	app.service('SearchService', function ($q, FilterItemsFactory, ItemDataFactory, AutoBuyFactory, SettingsService) {

		function get (deferred, settings) {
			req(fmt('http://steamcommunity.com/market/search/render/?query={0}&start=0&count=30&sort_column=price&sort_dir=asc', settings.items),
					{
						steamLogin: '76561198058604396%7C%7C5CF1633B6BBD5EE3A03CBDE7291C0AE1320C5753'
					}
				).then(function (response) {
					var body = response.getBody();
					var $ = cheerio.load('<div>' + body.results_html + '</div>');
					var data = [];

					$('.market_listing_row').each(function(i, elem) {
					  var item = ItemDataFactory($(this));
					  data.push(item);
					});

					// Filter items according to our settings
					data = FilterItemsFactory.filter(data, undefined, settings.items);

					// Autobuy
					// data.forEach(function (i) {
					// 	AutoBuyFactory.buy(i, 'newly');
					// });

					deferred.resolve(data);
				}, deferred.reject);
		}

		return {

			get: function (settings) {
				var deferred = $q.defer();
				get(deferred, settings);
				return deferred.promise;
			}

		};
	});
};
