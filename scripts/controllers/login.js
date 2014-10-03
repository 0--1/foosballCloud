angular.module('foosballApp').controller('loginCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore, $location) {
	var init = function() {
		$scope.passcode = "";
		if($scope.user.login) {
			$scope.changeUrl('dashboard');
		}
	}

	$scope.login = function() {
		if($scope.passcode === 'Behrooz') {
			$cookieStore.put('user', true);
			$scope.user.login = true;
			$scope.changeUrl('/dashboard');
		} else if($scope.passcode === 'behrooz') {
			$scope.message = "Please capitalize the first letter of my name!";
		}
	}

	init();
}]);