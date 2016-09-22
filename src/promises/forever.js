import Promise from 'bluebird';

/**
 * Run a promise over and over forever
 * @param {Function} delegate
 */
export default async function forever (delegate) {

	return Promise.coroutine(function* (delegate) {

		let done = false;

		while (!done) {

			done = yield delegate();

		}

	})(delegate);

}
