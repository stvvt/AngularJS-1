var DOMCompiler = (function () {
	'use strict';

	bootstrap: function () {
		var rootScope = Provider.get('rootScope');
		var rootEl    = $('[ng-app]');

		this.compile(rootEl, rootScope);

	},

	compile: function (domEl, scope) {

	}
})();