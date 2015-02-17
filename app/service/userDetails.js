'use strict';

var cheerio = require('cheerio');
var req = require('../lib/request.js');

module.exports = function (app) {
	app.service('UserDetailsService', function ($q, SettingsService) {
		var details = {};

		var parse = function (steamLogin, deferred) {
			req('http://store.steampowered.com/', {steamLogin: steamLogin})
				.then(function (response) {
					var body = response.getBody();
					var $ = cheerio.load(body);

					var tmp = {};
					tmp.name = $('#account_pulldown').text();

					if (tmp.name) {
						tmp.photo = $('.playerAvatar img').attr('src');
						tmp.balance = $('#header_wallet_balance').text();
						tmp.sessionID = body.match(/var g_sessionID = \"(.*)\"\;/)[1];

						//tmp.currency = body.match(/\"wallet_currency\"\:(.*)\"\;/)[1];
						//tmp.country = body.match(/var g_strLanguage = \"(.*)\"\;/)[1];

						deferred.resolve(tmp);
						details = tmp;
					} else {
						details = {};
						deferred.reject();
					}
				}, deferred.reject);
		};

		return {

			get: function (steamLogin) {
				var deferred = $q.defer();

				if (steamLogin || !details.name) {
					steamLogin = steamLogin ? steamLogin : (SettingsService.user.get()).steamLogin;
					parse(steamLogin, deferred);
				} else {
					deferred.resolve(details);
				}

				return deferred.promise;
			}

		};
	});
};
