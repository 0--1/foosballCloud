angular.module('foosballApp').controller('mainCtrl', function($scope, $cookieStore, $location, $http, $modal) {
	var init = function() {
		$scope.user = {};
		if(!$cookieStore.get('user')) {
			$scope.changeUrl('login');
		} else {
			$scope.user.login = $cookieStore.get('user');
			$http({method: 'get', url: 'backend/api.php?a=lp'})
				.success(function(data, status) {
					$scope.playersData = data;
				})
				.error(function() {
					console.log(arguments);
				});
		}
	}

	$scope.logout = function() {
		$cookieStore.remove('user');
		$scope.user = {login: false};
		$location.url('login');
	}

	$scope.changeUrl = function(page) {
		$location.url(page);
	}

	$scope.createSeriesModal = function() {
		$scope.newSeriesPrize = 'Jamba';
		$scope.newSeriesLength = 7;

		$scope.teams = {one: [], two: []};

		// for(var i = 0, n = $scope.playersData.length; i < n; i++) {
		// 	$scope.team1players[i] = false;
		// 	$scope.team2players[i] = false;
		// }

		$scope.seriesModal = $modal.open({templateUrl: 'views/modals/create_series.html', scope: $scope});
	}

	$scope.assignPlayer = function(team, pid) {
		var ind = $scope.teams[team].indexOf(pid);
		var ind1 = $scope.teams.one.indexOf(pid);
		var ind2 = $scope.teams.two.indexOf(pid);

		if(ind > -1) {
			$scope.teams[team].splice(ind, 1);
		} else if(ind1 + ind2 < -1 && $scope.teams[team].length < 2) {
			$scope.teams[team].push(pid);
		}

		if($scope.teams.one.length == 2 && $scope.teams.two.length == 2) {
			$scope.createAlert = false;
		}
	}

	$scope.createSeries = function() {
		if($scope.teams.one.length == 2 && $scope.teams.two.length == 2) {
			$http({method: 'get', url: 'backend/api.php', params: {
					a: 'as',
					prize: $scope.newSeriesPrize,
					length: $scope.newSeriesLength,
					t1p1: $scope.teams.one[0],
					t1p2: $scope.teams.one[1],
					t2p1: $scope.teams.two[0],
					t2p2: $scope.teams.two[1]
				}}).success(function(data) {
					
					$location.url('series/' + data);
				});
			$scope.seriesModal.dismiss();
		} else {
			$scope.createAlert = true;
		}
	}

	$scope.cancelCreateSeries = function() {
		$scope.seriesModal.dismiss();
	}

	init();
});