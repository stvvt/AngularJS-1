

Provider.service('Foo', function Foo(Bar) {
	alert(Bar.getValue());
});

Provider.service('Bar', function Bar() {
	return {
		getValue: function () {
			return 42;
		}
	};
});

Provider.get('Foo');