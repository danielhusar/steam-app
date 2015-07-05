'use strict';

var requestify = require('requestify');

module.exports = function (url, cookies, method, body) {
	method = method ? method : 'GET';
	cookies = cookies ? cookies : {};
	body = body ? body : {};

	return requestify.request(url, {
		method: 'GET',
		cookies: cookies,
		body: body,
		headers: {
      'X-Requested-With': 'http://steamcommunity.com/market/search'
    },
	});
};
