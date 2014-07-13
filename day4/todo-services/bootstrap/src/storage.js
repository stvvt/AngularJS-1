/* global TodoApp, localStorage */

TodoApp.provider('storage', function () {
	var keyName;

	return {
		setKey: function (key) {
			keyName = key;
		},

		$get: function () {
			var data = JSON.parse(localStorage.getItem(keyName)) || {};

			return {
				/**
				 * set the value of the property with key -  key to the data variable and after that save the 
				 * JSON serialized value of the data variable to localStorage.
				 */
				put: function (key, value) {
					data[key] = value;
					localStorage.setItem(keyName, JSON.stringify(data));
				},

				/**
				 * return the key property of the data variable.
				 */
				get: function (key) {
					return data[key];
				}
			};
		}
	};
});