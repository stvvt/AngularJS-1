/* global window, angular */

(function () {
  'use strict';

  // Create the appropriate module and
  // configure its $routeProvider

  var todo = angular.module('todo', ['ngRoute']);

  todo.config(function($routeProvider) {
  	$routeProvider
  		.when('/todo/:id', {
  			controller: 'TodoCtrl',
  			resolve: {
  				todo: function ($route, Todo) {
  					return Todo.get($route.current.params.id);
  				}
  			},
  			templateUrl: 'partials/todo.html'
  		})
  		.when('/todos', {
			controller: 'TodosCtrl',
			resolve: {
  				todos: function (Todo) {
  					return Todo.getList();
  				}
  			},
  			templateUrl: 'partials/todos.html'
  		})
  		.when('/edit/:id', {
			controller: 'TodoCtrl',
			resolve: {
				todo: function ($route, Todo) {
  					return Todo.get($route.current.params.id);
  				},
  				todos: function (Todo) {
  					return Todo.getList();
  				}
  			},
  			templateUrl: 'partials/edit.html'
  		})
  		.when('/add', {
  			controller: 'TodoCtrl',
			resolve: {
				todo: function ($route, $q) {
					return $q.when({});
  				},
  				todos: function (Todo) {
  					return Todo.getList();
  				}
  			},
  			templateUrl: 'partials/add.html'
  		}).
  		otherwise({redirectTo: '/todos'});
  	
	});

	window.TodoApp = todo;
}());

