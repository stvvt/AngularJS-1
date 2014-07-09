var DOMCompiler = (function () {
	'use strict';

	return {
		bootstrap: function (rootEl) {
			var rootScope = Provider.get('rootScope');

			this.compile(rootEl, rootScope);
		},

		compile: function (domEl, scope) {
			// For each domEl.attributes, try and get the corresponding directive
			var attributes = Array.prototype.slice.call(domEl.attributes);
			var dir, allowNewScope = true;

			for (var i = 0; i < attributes.length; i += 1) {
				dir = Provider.get(attributes[i].name + Provider.DIRECTIVES_SUFFIX);
				if (dir) {
					if (dir.scope && allowNewScope) {
						// Allow at most one new scope
						scope = scope.$new();
						allowNewScope = false;
					}

					dir.link(domEl, scope, attributes[i].value);
					// console.log([domEl.tagName, scope]);
				}
			}

			for (var i = 0; i < domEl.children.length; i += 1) {
				this.compile(domEl.children[i], scope);
			}
		}
	};
})();