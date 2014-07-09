Provider.directive('ngl-model', function () {
	return {
		link: function (el, scope, exp) {
			scope.$watch(exp, function (current, last) {
				el.value = current;
			});
			el.onkeyup = function () {
				scope[exp] = el.value;
				scope.$digest();
			}
			scope.$digest();
		}
	};
});
