/* global TodoApp */

TodoApp.directive('todoForm', function () {
	return {
		restrict: 'E',
		templateUrl: 'src/directives/todoForm.html',
		scope: {
			todo: '=',
			save: '&'
		},
		link: function (scope) {
			
			scope.saveData = function () {
				scope.save();
			}
		}		
	}
});