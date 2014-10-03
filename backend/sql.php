<!DOCTYPE html>
<html>
<head>
	<title>SQL Command Executer</title>
	<script type="text/javascript" src="../vendors/angular/angular.js"></script>
	<script type="text/javascript">
		angular.module('sqlApp', [])
			.controller('mainCtrl', function($scope, $http) {
				$scope.submit = function() {
					// $http.post('execute.php', {sql: $scope.sql})
					// 	.success(function (data) {
					// 		console.log(data);
					// 	});

				$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
					var request = $http({
						method: 'post',
						url: 'execute.php',
						params: {
							sql: $scope.sql,
							test: 'tt'
							}
						});
					request.success(function(data) {
						console.log(data);
					});
				}
			});
	</script>
</head>
<body ng-app="sqlApp" ng-controller="mainCtrl">
	<div>
		Enter SQL command: <input type="text" ng-model="sql">
		<button ng-click="submit()">Execute</button>
	</div>
</body>
</html>