(function () {
  "use strict";

  angular.module('time', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
    .config(["$routeProvider",function($routeProvider) {
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
          templateUrl: 'timesheetContainer.html',
          controller: 'TimesheetCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);
}());