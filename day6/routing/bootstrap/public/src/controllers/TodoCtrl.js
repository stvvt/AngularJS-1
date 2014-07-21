/* global TodoApp */

TodoApp.controller('TodoCtrl', function ($scope, $location, Todo, todo) {
	$scope.todo = new Todo(todo);

	$scope.update = function () {
		console.log('update');
		$scope.todo.update();
		$location.path('/');
	};

	$scope.save = function () {
		console.log('save');
		$scope.todo.save()
		$location.path('/');
	};

	$scope.remove = function () {
		$scope.todo.destroy();	
		$location.path('/');
	};
});