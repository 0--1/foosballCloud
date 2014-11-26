angular.module('foosballApp').controller('loginCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore, $location) {
	var init = function() {
		$scope.passcode = '';
		if($scope.user.login) {
			$scope.changeUrl('dashboard');
		}

		// temporary auto login
		$cookieStore.put('user', true);
		$scope.user.login = true;
		$scope.changeUrl('/searcn');

		window.location.href = location.origin + location.pathname + '#/search';
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