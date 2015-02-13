'use strict';

require('./app/model/settings.js').seeds();
require('./app/model/newly.js').seeds();

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
      .when('/settings', {
        templateUrl: './public/settings.html',
        controller: 'SettingsController'
      })
      .otherwise({
        redirectTo: '/',
      });
  })
  .config(function ($anchorScrollProvider) {
    $anchorScrollProvider.disableAutoScrolling();
  });

require('./app/controller/index.js')(app);
require('./app/controller/search.js')(app);
require('./app/controller/settings.js')(app);
require('./app/service/settings.js')(app);
require('./app/service/userDetails.js')(app);
require('./app/service/newly.js')(app);
