var TodoControllers = angular.module('TodoControllers', []);

TodoControllers.controller('TodoCtrl', ['$scope', function($scope) 
{
	'use strict';

	$scope.todos = [];

	($scope.reset = function () {
		$scope.newTodo = Object.create({
			title: '',
			is_completed: false
		});
		$scope.mode = 'Add';
	})();

	$scope.add = function (newTodo) {
		if ($scope.todos.indexOf(newTodo) < 0) {
			$scope.todos.push(newTodo);
		}
	};

	$scope.edit = function (todoItem) {
		$scope.newTodo = todoItem;
		$scope.mode    = 'OK';
	};

	$scope.remove = function (todoItem) {
		var idx = $scope.todos.indexOf(todoItem);

		if (idx >= 0) {
			$scope.todos.splice(idx, 1);
		}
	}
}]);