angular.module('foosballApp').controller('dashboardCtrl', ['$scope', '$cookieStore', '$location', '$http', function($scope, $cookieStore, $location, $http) {
	var init = function() {
		if(!$cookieStore.get('user')) {
			$scope.changeUrl('login');
		}

	}

	init();
}]);