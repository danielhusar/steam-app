'use strict';

var _ = require('lodash');
var fmt = require('simple-fmt');
var cheerio = require('cheerio');
var req = require('../lib/request.js');
var items = [];

module.exports = function (app) {
	app.service('NewlyService', function ($q, FilterItemsFactory, ItemDataFactory, UserDetailsService) {

		function get (deferred, settings) {

			var settings = UserDetailsService.get();
			req(fmt('http://steamcommunity.com/market/recent?country={0}&language={1}&currency={2}', settings.country, settings.language, settings.currency))
				.then(function (response) {
					var body = response.getBody();
					var $ = cheerio.load('<div>' + body.results_html + '</div>');
					var data = [];

					$('.market_listing_row').each(function(i, elem) {
					  var item = ItemDataFactory($(this));
					  data.push(item);
					});

					// Reduce to only uniq intems
					items = _.uniq(data.concat(items), function (i) {
						return i.id;
					});

					// Filter items according to our settings
					items = FilterItemsFactory.filter(items, settings.game, settings.items);
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
