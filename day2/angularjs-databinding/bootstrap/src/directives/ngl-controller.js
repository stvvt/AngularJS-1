/**
 * Define a directive called ngl-controller. When applied to given DOM element as attribute, as value it should accept name of
 * controller. The link function of this directive should create new controller with name the value of the attribute. The controller 
 * should be invoked with local dependencies hash containing property called $scope and value the new scope passed to the directive's 
 * link function (i.e. the directive should require creation of new scope).
 */

Provider.directive('ngl-controller', function () {
	return {
		scope: true,
		link: function (el, scope, ctrlName) {
			var ctrl = Provider.get(ctrlName + Provider.CONTROLLERS_SUFFIX);
			Provider.invoke(ctrl, {$scope: scope});
		}
	};
});
