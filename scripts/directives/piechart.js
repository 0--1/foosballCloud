angular.module('foosballApp').directive('pieChart', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			items: '='
		},
		template: '<div id="container" style="margin: 0 auto">not working</div>',
		link: function(scope, element, attrs) {
			// var chart = new Highcharts.Chart({
			// 	chart: {
			// 		renderTo: 'container'
			// 	},
			// 	credits: {
			// 		enabled: false
			// 	},
			// 	title: {
			// 		text: 'Test title'
			// 	},
			// 	tooltip: {
			// 		pointFormat: '{series.name}: <b>{point.percentage}%</b>',
			// 		percentageDecimals: 1
			// 	},
			// 	plotOptions: {
			// 		pie: {
			// 			allowPointSelect: true,
			// 			cursor: 'pointer'
			// 		}
			// 	},
			// 	series: [{
			// 		type: 'pie',
			// 		name: 'Test Data',
			// 		data: scope.items
			// 	}]
			// });

			var options = {
				chart: {
					type: 'pie',
					renderTo: 'container'
				},
				title: {
					text: 'Browser market share, April, 2011'
				},
				yAxis: {
					title: {
						text: 'Total percent market share'
					}
				},
				plotOptions: {
					pie: {
						shadow: false,
						center: ['50%', '50%']
					}
				},
				tooltip: {
					valueSuffix: '%'
				},
				series: [{
					name: 'Browsers',
					data: scope.items,
					size: '60%',
					dataLabels: {
						formatter: function () {
							return this.y > 5 ? this.point.name : null;
						},
						color: 'white',
						distance: -30
					}
				}, {
					name: 'Versions',
					data: scope.items,
					size: '80%',
					innerSize: '60%',
					dataLabels: {
						formatter: function () {
							// display only if larger than 1
							return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
						}
					}
				}]
			};

			var chart = new Highcharts.Chart(options);

			scope.$watch('items', function (newValue) {
				chart.series[0].setData(newValue, true);
			});
		}
	};
});