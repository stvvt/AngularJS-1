var TodoControllers = angular.module('TodoControllers', []);

TodoControllers.controller('TodoCtrl', ['$scope', function($scope) 
{
	'use strict';

	$scope.todos = [];

	($scope.reset = function () {
		this.newTodo = Object.create({
			title: '',
			is_completed: false
		});
	}).call($scope);

	$scope.addTodo = function (newTodo) {
		this.todos.push(newTodo);
	};

	$scope.delete = function (todoItem) {
		var idx = this.todos.indexOf(todoItem);

		if (idx >= 0) {
			this.todos.splice(idx, 1);
		}
	}
}]);