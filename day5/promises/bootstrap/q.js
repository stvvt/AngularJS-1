var STATES = {
	CLEAN: 0,
	RESOLVED: 1,
	REJECTED: 2
};

function Promise() {
	'use strict';

	this._done = [];
	this._fail = [];
	this._state = STATES.CLEAN;
	this._resolveData = null;
	this._rejectData = null;
}

/**
 * accepts a callback and add it to the `_done` array. If the current state of the promise is `RESOLVED` 
 * it invokes the callback with the `_resolvedData`.
 */
Promise.prototype.done = function (cb) {
	this._done.push(cb);

	if (this._state == STATES.RESOLVED) {
		cb(this._resolveData);
	}

	return this;
}

/**
 * accepts a callback and add it to the `_fail` array. If the current state of the promise is `REJECTED` 
 * it invokes the callback with the `_rejectData`.
 */
Promise.prototype.fail = function (cb) {
	this._fail.push(cb);

	if (this._state == STATES.REJECTED) {
		cb(this._rejectData);
	}

	return this;
}

/**
 * Deferred constructor
 */
function Deferred() {
	this.promise = new Promise();
}

/**
 * throws an error if the promise is not in "clean" state, otherwise it sets the promise state to `RESOLVED`, 
 * sets the resolved data (`_resolvedData`) and invokes each of the promise's done callbacks with the data passed as argument.
 */
Deferred.prototype.resolve = function (data) {
	if (this.promise._state != STATES.CLEAN) {
		throw "Error Resolve!!!";
	}

	this.promise._state = STATES.RESOLVED;
	this.promise._resolveData = data;

	for (var i = 0; i < this.promise._done.length; i++) {
		this.promise._done[i](data);
	}
}

/**
 * throws an error if the promise is not in "clean" state, otherwise it sets the promise state to `REJECTED`, sets the rejected 
 * data (`_rejectData`) and invokes each of the promise's fail callbacks with the data passed as argument.
 */
Deferred.prototype.reject = function (data) {
	if (this.promise._state != STATES.CLEAN) {
		throw "Error Reject!!!";
	}

	this.promise._state = STATES.REJECTED;
	this.promise._rejectData = data;

	for (var i = 0; i < this.promise._fail.length; i++) {
		this.promise._fail[i].call(this, data);
	}
}

var Q = {
	/**
	 * @return new deferred object
	 */
	 defer: function () {
	 	return new Deferred();
	 },

	 /**
	  * Accepts a list of promises and returns a new promise. The new promise would be resolved once all deferreds passed 
	  * as arguments are resolved
	  * 
	  * @param promises array of Promise
	  * @return Promise
	  */
	 all: function (promises) {
	 	var resolvedData = [];
	 	var nResolved = 0;
	 	var result = Q.defer();
	 	var nPromises = promises.length;
	 	var done = false;

	 	for (var i = 0; i < nPromises; i++) {
	 		if (done) { break; } 
	 		(function (i) {
	 			promises[i].done(function (data) {
	 				resolvedData[i] = data;
	 				nResolved++;

					if (nResolved == nPromises) {
						result.resolve(resolvedData);
						done = true;
					}
	 			}).fail(function (data) {
	 				done = true;
	 				result.reject(data);
	 			});
	 		})(i); 
	 	}

	 	return result.promise;
	 },

	 /**
	  * creates new deferred object, returns its promise and resolves the deferred object with the passed data.
	  */
	 when: function (data) {
	 	var result = Q.defer().resolve(data);

	 	return result.promise;
	 }
};
