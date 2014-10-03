angular.module('foosballApp').controller('seriesCtrl', function($scope, $http, $routeParams) {
	var init = function() {
		if(!!$routeParams.seriesId) {
			$scope.seriesId = $routeParams.seriesId;
		} else {
			$scope.seriesId = 0;
		}

		$scope.newScoreT1 = 0;
		$scope.newScoreT2 = 0;
		$scope.enterScore = false;

		$scope.loadData();
	}

	$scope.loadData = function() {
		$http({method: 'get', url: 'backend/api.php', params: {
				a: 'lm',
				sid: $scope.seriesId
			}})
			.success(function(data, status) {
				$scope.seriesData = data;
			})
			.error(function() {
				console.log(arguments);
			});
	}

	$scope.recordScore = function() {
		$scope.enterScore = true;
	}

	$scope.submitScore = function() {
		$http({method: 'get', url: 'backend/api.php', params: {
				a: 'am',
				sid: $scope.seriesId,
				t1s: $scope.newScoreT1,
				t2s: $scope.newScoreT2
			}})
			.success(function(data, status) {
				$scope.cancelScore();
				$scope.loadData();
			})
			.error(function() {
				console.log(arguments);
			});
	}

	$scope.cancelScore = function() {
		$scope.newScoreT1 = 0;
		$scope.newScoreT2 = 0;
		$scope.enterScore = false;
	}
	
	init();
});