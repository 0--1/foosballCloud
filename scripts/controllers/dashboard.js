angular.module('foosballApp').controller('dashboardCtrl', ['$scope', '$cookieStore', '$location', '$http', function($scope, $cookieStore, $location, $http) {
	var init = function() {
		$scope.changeUrl('/search');
	}

	init();
}]);