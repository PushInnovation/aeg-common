import { Promise as BBPromise } from 'bluebird';

/**
 * Run a promise over and over forever
 * @param {Function} delegate
 */
export default async function forever (delegate: () => BBPromise<void>) {

	return BBPromise.coroutine(function* (innerDelegate) {

		let done: boolean = false;

		while (!done) {

			done = yield innerDelegate();

		}

	})(delegate);

}
