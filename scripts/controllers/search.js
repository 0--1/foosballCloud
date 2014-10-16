angular.module('foosballApp').controller('searchCtrl', function($scope, $routeParams, $http) {
	var init = function() {
		$http({method: 'get', url: 'backend/api.php', params: {
				a: 'ss',
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