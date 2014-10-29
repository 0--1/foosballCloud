angular.module('foosballApp').controller('mainCtrl', function($scope, $cookieStore, $location, $http, $modal) {
	var init = function() {
		$scope.main = {page: 0, which: 'on'};

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
		$scope.seriesModal = $modal.open({templateUrl: 'views/modals/create_series.html', scope: $scope});
	}

	init();
});