'use strict';

var _ = require('lodash');
var fmt = require('simple-fmt');
var cheerio = require('cheerio');
var splitLines = require('split-lines');
var forEach = require('async-foreach').forEach;
var req = require('../lib/request.js');
var attempts = [];

module.exports = function (app) {
	app.service('SearchService', function ($q, UserDetailsService, ItemDataFactory, BuyService, SettingsService) {
		var user = UserDetailsService.get();

		// this doesn't return a promise on purpose
		function get (deferred, settings) {

			forEach(splitLines(settings.items), function (item) {
				var temp = item.split('?');
				var baseUrl = temp[0];
				var param = temp[1] || '';
				var url = fmt(baseUrl + '/render?query=&start=10&count=10&country={0}&language={1}&currency={2}&' + param, user.country, user.language, user.currency);

				req(item); // you might need to access original url so items appear there
				req(url, {steamLogin: settings.cookie}).then(function (response) {
					var body = response.getBody();
					var $ = cheerio.load('<div>' + body.results_html + '</div>');

					$('.market_listing_row').each(function () {
					  var item = ItemDataFactory($(this));

					  if (!item.sold && !attempts[item.id] && settings.attempts > 0) {
					  	BuyService.buy(item);
					  	settings.attempts = settings.attempts - 1;
					  	SettingsService.search.set(settings);
					  	attempts.push(item.id);
					  }
					});
				});

			});

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
