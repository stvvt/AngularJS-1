Provider.directive('ngl-bind', function () {
	return {
		link: function (el, scope, exp) {
			scope.$watch(exp, function (current, last) {
				el.innerHTML = current;
			});
			el.innerHTML = scope.$eval(exp);
		}
	};
});
