/* global TodoApp */

TodoApp.config(function ($provide) {
	$provide.decorator('storage', function ($delegate, $log) {
		var origPut = $delegate.put;

		$delegate.put = function (key, value) {
			$log.log("Storing data in key", key, 'with value', value);
			origPut.apply($delegate, arguments);
		}

		return $delegate;
	});
});;