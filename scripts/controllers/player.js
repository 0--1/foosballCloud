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
		if($scope.playerId > 0) {
			$scope.loadSeriesStat();
			$scope.loadMatchesStat();
		}
	};

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
	};

	$scope.loadSeriesStat = function() {
		$http({method: 'get', url: 'backend/api.php', params: {
				a: 'ss',
				pid: $scope.playerId
			}})
			.success(function(data, status) {
				$scope.playerStat = data;
				$scope.calculateSeriesStat();
			})
			.error(function() {
				console.log(arguments);
			});
	};

	$scope.loadMatchesStat = function() {
		$http({method: 'get', url: 'backend/api.php', params: {
				a: 'ms',
				pid: $scope.playerId
			}})
			.success(function(data, status) {
				$scope.playerMatchesStat = data;
				$scope.calculateMatchesStat();
			})
			.error(function() {
				console.log(arguments);
			});
	}

	$scope.calculateSeriesStat = function() {
		$scope.totalSeries = $scope.playerStat.length;
		$scope.wonSeries = 0;
		$scope.lostSeries = 0;
		$scope.ongoingSeries = 0;
		$scope.unredeemedSeries = 0;

		for(var i = 0; i < $scope.playerStat.length; i++) {
			if($scope.playerStat[i].done == 0) {
				$scope.ongoingSeries++;
			} else {
				if($scope.playerStat[i].redeemed == 0) {
					$scope.unredeemedSeries++;
				}
				if($scope.playerStat[i].team1total > $scope.playerStat[i].team2total) {
					if($scope.playerStat[i].team1player1 == $scope.playerId || $scope.playerStat[i].team1player2 == $scope.playerId) {
						$scope.wonSeries++;
					} else {
						$scope.lostSeries++;
					}
				} else {
					if($scope.playerStat[i].team1player1 == $scope.playerId || $scope.playerStat[i].team1player2 == $scope.playerId) {
						$scope.lostSeries++;
					} else {
						$scope.wonSeries++;
					}
				}
			}
		}
	};

	$scope.calculateMatchesStat = function() {
		$scope.totalMatches = $scope.playerMatchesStat.length;
		$scope.wonMatches = 0;
		$scope.lostMatches = 0;
		$scope.goalsScored = 0;
		$scope.goalsReceived = 0;

		for(var i = 0; i < $scope.playerMatchesStat.length; i++) {
			if($scope.playerMatchesStat[i].team1player1 == $scope.playerId || $scope.playerMatchesStat[i].team1player2 == $scope.playerId) {
				$scope.goalsScored += parseInt($scope.playerMatchesStat[i].team1score);
				$scope.goalsReceived += parseInt($scope.playerMatchesStat[i].team2score);

				if($scope.playerMatchesStat[i].team1score > $scope.playerMatchesStat[i].team2score) {
					$scope.wonMatches++;
				} else {
					$scope.lostMatches++;
				}
			} else {
				$scope.goalsScored += parseInt($scope.playerMatchesStat[i].team2score);
				$scope.goalsReceived += parseInt($scope.playerMatchesStat[i].team1score);

				if($scope.playerMatchesStat[i].team1score < $scope.playerMatchesStat[i].team2score) {
					$scope.wonMatches++;
				} else {
					$scope.lostMatches++;
				}
			}
		}
	}

	init();
});