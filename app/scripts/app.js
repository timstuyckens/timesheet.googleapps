(function () {
  "use strict";

  angular.module('time', [
    'ngCookies',
    'ngResource',
    'ngSanitize'
  ])
    .config(function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'MainContainer.html',
          controller: 'HomeCtrl'
        })
        .when('/holiday', {
          templateUrl: 'HolidayContainer.html',
          controller: 'HolidayCtrl'
        })
        .when('/timesheet', {
          templateUrl: 'TimesheetContainer.html',
          controller: 'TimesheetCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
}());