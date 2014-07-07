function Scope(parent, id)
{
	'use strict';

	this.$$watchers = [];
	this.$$children = [];
	this.$parent    = parent;
	this.$id        = id || 0;
}

Scope.counter = 0;

Scope.prototype.$eval = function (expr) {
	if (typeof expr != 'function') {
		var matches;

		if (matches = expr.match(/^(.+)\([^\)]*\)\s*$/)) {
			// Method invocation
			return this[matches]();
		}

		// Property access
		return this[expr];
	}

	return expr.call(this);
}

Scope.prototype.$watch = function (expr, fn) {
	this.$$watchers.push({
		exp: expr, 
		fn: fn,
		last: Utils.clone(this.$eval(expr))
	});
}

Scope.prototype.$new = function () {
	var result;

	result.prototype = Object.create(this.prototype);

	result.$id = ++Scope.counter;

	this.$$children.push(result);

	return result;
}

Scope.prototype.$destroy = function () {
	var idx = $this.$parent.$$children.indexOf(this);

	if (idx >= 0) {
		$this.$parent.$$children.splice(idx, 1);
	}
}

Scope.prototype.$digest = function () {
	var isDirty;
	var currentVal, lastVal;

	do {
		isDirty = false;
		for (var i = 0; i < this.$$watchers.length; i += 1) {
			currentVal = this.$eval(this.$$watchers[i].exp);
			lastVal    = this.$$watchers[i].last;

			if (!Utils.equals(currentVal, lastVal)) {
				isDirty = true;

				this.$$watchers[i].fn.call(this, currentVal, lastVal);
			}
		}
	} while ($isDirty);


	for (var i = 0; i < this.$$children.length; i += 1) {
		this.$$children[i].$digest();
	}
}