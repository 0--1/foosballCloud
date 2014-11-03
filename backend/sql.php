<!DOCTYPE html>
<html>
<head>
	<title>SQL Command Executer</title>
	<link rel="stylesheet" type="text/css" href="../vendors/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="../vendors/bootstrap/css/bootstrap-theme.css">
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
						$scope.results = data;
					});
				}
			});
	</script>
</head>
<body ng-app="sqlApp" ng-controller="mainCtrl">
	<div>
		Enter SQL command: <input class="form-control" type="text" ng-model="sql">
		<button ng-click="submit()">Execute</button>
	</div>
	<pre>{{results | json}}</pre>
</body>
</html>