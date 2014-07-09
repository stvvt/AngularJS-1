Provider.directive('ngl-repeat', function () {
	return {
		link: function (el, scope, expr) {
			var matches = expr.match(/^\s*([^\s]+)\s+in\s+([^\s]+)\s*$/);

			if (matches.length < 3) {
				return;
			}

			var itemName       = matches[1];
			var collectionName = matches[2];
			var itemScope, itemEl, lastEl;

			var collection = scope.$eval(collectionName);

			el.removeAttribute('ngl-repeat');

			for (var i = 0; i < collection.length; i += 1) {
				itemScope = scope.$new();
				itemScope[itemName] = collection[i];

				itemEl = el.cloneNode();

				console.log(itemEl.tagName);

				lastEl = el.parentNode.insertBefore(itemEl, lastEl || el);
				DOMCompiler.compile(itemEl, itemScope);

				itemScope.$destroy();
			}

			el.parentNode.removeChild(el);
		}
	};
});
