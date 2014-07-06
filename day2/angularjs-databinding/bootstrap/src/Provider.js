var Provider = (function () 
{
	'use strict';

	/**
	 * Privates
	 */
	var _ = {
		register: function (name, factoryMethod) {
			this.providers[name] = factoryMethod;
		},

		providers: {},

		cache: {
			rootScope: new Scope()
		}
	};

	return {
		DIRECTIVES_SUFFIX: "Directive",

		CONTROLLERS_SUFFIX: "Controller",

		get: function (name, locals) {
			locals = locals || [];

			if (!_.cache[name]) {
				_.cache[name] = this.invoke(_.providers[name], locals);
			}

			return _.cache[name];
		},

		directive: function (name, factoryMethod) {
			_.register(name + this.DIRECTIVES_SUFFIX, factoryMethod);
		}, 	

		controller: function (name, factoryMethod) {
			_.register(name + this.CONTROLLERS_SUFFIX, factoryMethod);
		},

		service: function (name, factoryMethod) {
			_.register(name, factoryMethod);
		},

		invoke: function (factoryMethod, locals) {
			var depsNames = this.annotate(factoryMethod);
			var deps = [];

			for (var i = 0; i < depsNames.length; i += 1) {
				deps.push(locals[depsNames[i]] || this.get(depsNames[i], locals));
			}

			return factoryMethod.apply(this, deps);
		},

		annotate: function (func) {
			var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
			var ARGUMENT_NAMES = /([^\s,]+)/g;
			var fnStr = func.toString().replace(STRIP_COMMENTS, '');
	  		var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

			return result || [];
		}
	};
})();