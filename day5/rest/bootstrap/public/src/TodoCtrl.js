/* global TodoApp */

TodoApp.controller('TodoCtrl', function ($scope, Todo) {
	$scope.add = function () {
		var newTodo = new Todo({
			title: $scope.todoTitle,
			until: new Date($scope.todoDate + ' ' + $scope.todoTime)
		});

		newTodo.save();

		$scope.todoTitle = '';
		$scope.todoDate = '';
		$scope.todoTime = '';
	};

	$scope.remove = function (item) {
		item.destroy();
	};

	$scope.details = function (item) {
		$scope.todo = item;
	}

	$scope.todos = Todo.getList();
});