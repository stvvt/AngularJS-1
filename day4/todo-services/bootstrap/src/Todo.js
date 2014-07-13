/* global TodoApp */

TodoApp.factory('Todo', function (storage) {
	var todos = storage.get('todos') || [];

	for (var i = 0; i < todos.length; i++) {
		todos[i] = new Todo(todos[i].title, todos[i].date, todos[i].id);
	};

	function Todo(title, date, id) {
		this.title = title;
		this.date  = date;
		this.id    = id;
	};

	Todo.prototype.save = function () {
		this.id = todos.length;
		todos.push(this);
		storage.put('todos', todos);
	};

	Todo.prototype.destroy = function () {
		for (var i = 0; i < todos.length; i++) {
			if (todos[i].id == this.id) {
				todos.splice(i, 1);
				storage.put('todos', todos);
				return;
			}
		}
	};

	Todo.getList = function () {
		return todos;
	}

	return Todo;
});