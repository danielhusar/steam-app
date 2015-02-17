'use strict';

var _ = require('lodash');
var cheerio = require('cheerio');
var req = require('../lib/request.js');
var items = [];

module.exports = function (app) {
	app.service('NewlyService', function ($q, SettingsService, FilterItemsService, SanitizeNameService) {

		function get (deferred, settings) {
			req('http://steamcommunity.com/market/recent?country=IE&language=english&currency=3')
				.then(function (response) {
					var body = response.getBody();
					var $ = cheerio.load('<div>' + body.results_html + '</div>');
					var data = [];

					$('.market_listing_row').each(function(i, elem) {
					  var $this = $(this);
					  var item = {
							image: $this.find('.market_listing_item_img').attr('src'),
							name: SanitizeNameService($this.find('.market_listing_item_name').text()),
							game: $this.find('.market_listing_game_name').text(),
							url: $this.find('.market_listing_item_name_link').attr('href'),
							priceNoFee: $this.find('.market_listing_price_without_fee').text().replace(/($|€)/gi, '').replace(/\-/gi, '0').trim(),
							priceFee: $this.find('.market_listing_price_with_fee').text().replace(/($|€)/gi, '').replace(/\-/gi, '0').trim(),
							id: $this.html().match(/listing\_sell\_new\_(.*)\_image/)[1]
					  };
					  data.push(item);
					});

					// Reduce to only uniq intems
					items = _.uniq(data.concat(items), function (i) {
						return i.id;
					});

					// Filter items according to our settings
					items = FilterItemsService.filter(items, settings.game, settings.items);
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
