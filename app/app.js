'use strict';

require('./app/model/user.js').seeds();
require('./app/model/newly.js').seeds();
require('./app/model/search.js').seeds();

var app = angular.module('app', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: './public/index.html',
				controller: 'IndexController'
			})
			.when('/search', {
				templateUrl: './public/search.html',
				controller: 'SearchController'
			})
			.when('/basket', {
				templateUrl: './public/basket.html',
				controller: 'BasketController'
			})
			.when('/settings', {
				templateUrl: './public/settings.html',
				controller: 'SettingsController'
			})
			.otherwise({
				redirectTo: '/settings',
			});
	})
	.config(function ($anchorScrollProvider) {
		$anchorScrollProvider.disableAutoScrolling();
	})
	.constant('config', require('./app/config/config'));

require('./app/controller/index.js')(app);
require('./app/controller/search.js')(app);
require('./app/controller/settings.js')(app);
require('./app/controller/basket.js')(app);

require('./app/service/settings.js')(app);
require('./app/service/userDetails.js')(app);
require('./app/service/newly.js')(app);
require('./app/service/search.js')(app);
require('./app/service/buy.js')(app);

require('./app/factory/sanitize.js')(app);
require('./app/factory/itemData.js')(app);
require('./app/factory/filterItems.js')(app);
require('./app/factory/autoBuy.js')(app);

require('./app/directive/item.js')(app);
