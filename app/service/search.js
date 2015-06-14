'use strict';

var _ = require('lodash');
var fmt = require('simple-fmt');
var cheerio = require('cheerio');
var req = require('../lib/request.js');

module.exports = function (app) {
	app.service('SearchService', function ($q, UserDetailsService, FilterItemsFactory, ItemDataFactory, AutoBuyFactory) {

		var user = UserDetailsService.get();

		function get (deferred, settings) {
			var url = fmt(settings.items + '/render?query=&start=10&count=10&country={0}&language={1}&currency={2}', user.country, user.language, user.currency);

			req(url, {steamLogin: settings.cookie}).then(function (response) {

					var body = response.getBody();
					var $ = cheerio.load('<div>' + body.results_html + '</div>');
					var data = [];



					console.log($('.market_listing_row'));

					$('.market_listing_row').each(function () {
					  var item = ItemDataFactory($(this));
					  data.push(item);
					});

					console.log(data);

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
