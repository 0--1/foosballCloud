angular.module('foosballApp').controller('playerCtrl', function($scope, $routeParams, $http) {
	var init = function() {
		$scope.playerId = $routeParams.playerId;
		if($scope.playerId == 0) {
			$scope.main.page = 0;
		} else {
			$scope.main.page = 1;
		}

		$http({method: 'get', url: 'backend/api.php', params: {
				a: 'ls',
				pid: $scope.playerId
			}})
			.success(function(data, status) {
				$scope.seriesData = data;
			})
			.error(function() {
				console.log(arguments);
			});
	}

	init();
});