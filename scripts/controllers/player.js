angular.module('foosballApp').controller('playerCtrl', function($scope, $routeParams, $http) {
	var init = function() {
		$scope.playerId = $routeParams.playerId;

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