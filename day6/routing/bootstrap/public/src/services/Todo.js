/* global TodoApp */

TodoApp.factory('Todo', function ($http, $q) {
  'use strict';
  var todos = null;

  function Todo(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.completed = data.completed;
    this.created = new Date();
  }

  Todo.prototype.save = function () {
    $http.post('/todo', this)
      .success(function (data) {
        this.id = data.id
      }.bind(this));
  };

  Todo.prototype.update = function () {
     $http.post('/todo/' + this.id, this);
  };

  Todo.prototype.updateState = function () {
    $http.post('/todo/state/' + this.id, this);
  };

  Todo.prototype.destroy = function () {
    $http.delete('/todo/' + this.id);
  };

  Todo.getList = function () {
    if (todos) {
      return $q.when(todos);
    }

    return $http.get('/todo')
      .then(function (data) {
        var list = data.data;
        var todos = [];
        for(var i = 0; i < list.length; i++) {
          todos.push(new Todo(list[i]));
        }

        return todos;
      });
  };

  Todo.get = function (id) {
    return $http.get('/todo/' + id)
      .then(function (data) {
        return new Todo(data.data);
      });
  };

  return Todo;
});
