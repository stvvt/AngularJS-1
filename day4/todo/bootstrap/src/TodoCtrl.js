var TodoApp = angular.module('TodoApp', []);

TodoApp.controller('TodoCtrl', function ($scope) {
	$scope.todos = [];

	$scope.add = function () {
		$scope.todos.push($scope.newTodo);
		$scope.newTodo = {
			title: '',
			is_completed: false
		}
	};

	$scope.remove = function (item) {
		var idx = $scope.todos.indexOf(item);
		if (idx >= 0) {
			$scope.todos.splice(idx, 1);
		}
	};
});