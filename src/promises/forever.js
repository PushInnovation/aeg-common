// @flow

import Promise from 'bluebird';

/**
 * Run a promise over and over forever
 * @param {Function} delegate
 */
export default async function forever (delegate: () => ?Promise<void>) {

	return Promise.coroutine(function* (delegate) {

		let done: boolean = false;

		while (!done) {

			done = yield delegate();

		}

	})(delegate);

}
