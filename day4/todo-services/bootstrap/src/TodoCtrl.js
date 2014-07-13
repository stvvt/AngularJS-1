/* global TodoApp */

TodoApp.controller('TodoCtrl', function ($scope, Todo) {
	$scope.todos = Todo.getList();

	$scope.add = function () {
		var newItem = new Todo($scope.todoTitle, new Date());

		newItem.save();

		$scope.todoTitle = '';
	};

	$scope.remove = function (item) {
		item.destroy();
	};
});
