angular.module('foosballApp', 
	['ngRoute',
	'ngCookies',
	'ui.bootstrap']);

angular.module('foosballApp').config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/dashboard', {
		templateUrl: 'views/dashboard.html',
		controller: 'dashboardCtrl'
	})
	.when('/series/:seriesId', {
		templateUrl: 'views/series.html',
		controller: 'seriesCtrl'
	})
	.when('/charts', {
		templateUrl: 'views/charts.html',
		controller: 'chartsCtrl'
	})
	.when('/players', {
		templateUrl: 'views/players.html',
		controller: 'playersCtrl'
	})
	.when('/players/:playerId', {
		templateUrl: 'views/player.html',
		controller: 'playerCtrl'
	})
	.when('/search', {
		templateUrl: 'views/search.html',
		controller: 'searchCtrl'
	})
	.otherwise({
		templateUrl: 'views/login.html',
		controller: 'loginCtrl'
	});
});