'use strict';

var fs = require('fs');

module.exports = function (dir, args, namespace) {

	fs.readdirSync(dir).forEach(function(file) {
		var func = namespace ? require(dir + file)[namespace] : require(dir + file);
		namespace.apply(args || '');
	});

};
