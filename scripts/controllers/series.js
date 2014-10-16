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

		$scope.wins = [0, 0];

		$scope.loadData();

		$scope.scores = [];
		for(var i = 0; i < 101; i++) {
			$scope.scores[i] = i;
		}
	}

	$scope.loadData = function() {
		$http({method: 'get', url: 'backend/api.php', params: {
				a: 'lm',
				sid: $scope.seriesId
			}})
			.success(function(data, status) {
				$scope.seriesData = data;

				$scope.wins[0] = 0;
				$scope.wins[1] = 0;

				if(!!$scope.seriesData[0].team1score) {
					for(var i = 0; i < $scope.seriesData.length; i++) {
						if(parseInt($scope.seriesData[i].team1score) > parseInt($scope.seriesData[i].team2score)) {
							$scope.wins[0]++;
						} else if(parseInt($scope.seriesData[i].team1score) < parseInt($scope.seriesData[i].team2score)) {
							$scope.wins[1]++;
						}
					}
				}
			})
			.error(function() {
				console.log(arguments);
			});
	}

	$scope.recordScore = function() {
		$scope.enterScore = true;
	}

	$scope.submitScore = function() {
		var done = false;

		if(parseInt($scope.newScoreT1) > parseInt($scope.newScoreT2)) {
			$scope.wins[0]++;
		} else if(parseInt($scope.newScoreT1) < parseInt($scope.newScoreT2)) {
			$scope.wins[1]++;
		}

		if($scope.wins[0] > $scope.seriesData[0].length/2) {
			done = true;
		}
		if($scope.wins[1] > $scope.seriesData[0].length/2) {
			done = true;
		}
		
		$http({method: 'get', url: 'backend/api.php', params: {
				a: 'am',
				sid: $scope.seriesId,
				t1s: $scope.newScoreT1,
				t2s: $scope.newScoreT2,
				done: done
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

	$scope.redeem = function() {
		$http({method: 'get', url: 'backend/api.php', params: {
				a: 'mr',
				sid: $scope.seriesId
			}})
			.success(function(data, status) {
				$scope.loadData();
			})
			.error(function() {
				console.log(arguments);
			});
	}
	
	init();
});