'use strict';

var _ = require('lodash');
var fmt = require('simple-fmt');
var cheerio = require('cheerio');
var req = require('../lib/request.js');
var items = [];

module.exports = function (app) {
	app.service('NewlyService', function ($q, FilterItemsFactory, ItemDataFactory, AutoBuyFactory, UserDetailsService, SettingsService) {

		function get (deferred, settings) {
			var user = UserDetailsService.get();

			req(fmt('http://steamcommunity.com/market/recent?country={0}&language={1}&currency={2}', user.country, user.language, user.currency))
				.then(function (response) {
					var body = response.getBody();
					var $ = cheerio.load('<div>' + body.results_html + '</div>');
					var data = [];

					$('.market_listing_row').each(function(i, elem) {
					  var item = ItemDataFactory($(this));
					  data.push(item);
					});

					// Filter items according to our settings
					data = FilterItemsFactory.filter(data, settings.game, settings.items);

					// Reduce to only uniq items
					items = _.uniq(data.concat(items), function (i) {
						AutoBuyFactory.buy(i, 'newly');
						return i.id;
					});

					deferred.resolve(items);
				}, deferred.reject);
		}

		return {

			get: function (settings) {
				var deferred = $q.defer();
				get(deferred, settings);
				return deferred.promise;
			},

			cache: function () {
				return items;
			},

			clearCache: function () {
				items = [];
			}

		};
	});
};
