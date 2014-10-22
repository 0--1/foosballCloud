angular.module('foosballApp').controller('playersCtrl', ['$scope', '$cookieStore', '$http', function($scope, $cookieStore, $http) {
	var init = function() {
		$scope.main.page = 1;
	}

	init();
}]);