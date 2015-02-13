'use strict';

var requestify = require('requestify');

module.exports = function (url, cookies) {
	return requestify.request(url, {
		method: 'GET',
		cookies: cookies
	});
};
