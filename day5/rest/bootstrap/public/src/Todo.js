/* global TodoApp */

TodoApp.factory('Todo', function ($http) {
	var todos = [];

	function Todo(initData) {
		this.id = initData.id || null; // id of the todo item
		this.title = initData.title || ''; // title of the todo item
		this.created = initData.created || new Date(); // date when the todo item was created
		this.until = initData.until || null; // date when the todo item should be completed
	};

	Todo.get = function (id) {
		$http.get('/todo/' + id)
			.success(function (data) {
				return new Todo(data)
			});
	};

	Todo.getList = function () {
		$http.get('/todo')
			.success(function (data) {
				todos.splice(0, todos.length);
				for (var i = 0; i < data.length; i++) {
					todos.push(new Todo(data[i]));
				}
			});

		return todos;
	}

	Todo.prototype.save = function() {
		var self = this;
		$http.post('/todo', this)
			.success(function (data) {
				self.id = data.id;
				self.title = data.title;
				self.until = data.until;

				todos.push(self);
			});
	}

	Todo.prototype.destroy = function() {
		$http.delete('/todo/' + this.id)
			.success	(function (data) {
				var idx = todos.indexOf(this);
				todos.splice(idx, 1);
			});
	}

	return Todo;
});