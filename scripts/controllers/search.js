angular.module('foosballApp').controller('searchCtrl', function($scope, $routeParams, $http) {
	var init = function() {
		$scope.main.page = 3;

		$scope.selectedPlayers = [];
	}

	$scope.togglePlayer = function(playerId) {
		var playerIndex = $scope.selectedPlayers.indexOf(playerId);

		if(playerIndex < 0) {
			if($scope.selectedPlayers.length < 4) {
				$scope.selectedPlayers.push(playerId);
				$scope.searchSeries()
			}
		} else {
			$scope.selectedPlayers.splice(playerIndex, 1);
			$scope.searchSeries()
		}
	}

	$scope.searchSeries = function() {
		$scope.seriesData = {};
		$http({method: 'get', url: 'backend/api.php', params: {
				a: 'ls',
				pid: $scope.selectedPlayers[0],
				pid2: $scope.selectedPlayers[1],
				pid3: $scope.selectedPlayers[2],
				pid4: $scope.selectedPlayers[3]
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