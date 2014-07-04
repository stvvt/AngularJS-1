var TodoControllers = angular.module('TodoControllers', []);

TodoControllers.controller('TodoCtrl', ['$scope', '$filter', function($scope, $filter) 
{
	'use strict';

	$scope.todos = [{
		title: 'TODO 1',
		is_completed: false
	}, {
		title: 'TODO 2',
		is_completed: true
	}];

	($scope.reset = function () {
		$scope.newTodo = {
			title: '',
			is_completed: false
		};

		$scope.editingTodo = null;
	})();

	$scope.add = function () {
		if ($scope.editingTodo) {
			$scope.editingTodo = angular.copy($scope.newTodo, $scope.editingTodo);
		} else {
			$scope.todos.push($scope.newTodo);
		}

		$scope.reset();
	};

	$scope.edit = function (todoItem) {
		$scope.newTodo     = angular.copy(todoItem);
		$scope.editingTodo = todoItem;
	};

	$scope.remove = function (todoItem) {
		var idx = $scope.todos.indexOf(todoItem);

		if (idx >= 0) {
			$scope.todos.splice(idx, 1);
		}
	};

	$scope.isEditing = function (item) {
		if (item === undefined) {
			return $scope.editingTodo !== null;
		}

		return $scope.editingTodo === item;
	}
}]);