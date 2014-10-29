angular.module('foosballApp').controller('playerCtrl', function($scope, $routeParams, $http) {
	var init = function() {
		$scope.playerId = $routeParams.playerId;
		$scope.main.which = 'on';
		if($scope.playerId == 0) {
			$scope.main.page = 0;
		} else {
			$scope.main.page = 1;
		}

		$scope.loadSeries();
	}

	$scope.loadSeries = function() {
		$http({method: 'get', url: 'backend/api.php', params: {
				a: 'ls',
				pid: $scope.playerId,
				which: $scope.main.which
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