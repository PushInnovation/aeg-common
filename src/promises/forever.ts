import { Promise as BBPromise } from 'bluebird';

/**
 * Run a promise over and over forever
 */
export default async function forever (delegate: () => BBPromise<void>, context?: any) {

	const cr = BBPromise.coroutine(function* (innerDelegate) {

		let done: boolean = false;

		while (!done) {

			done = yield innerDelegate();

		}

	});

	if (context) {

		delegate.bind(context);

	}

	return cr(delegate);

}
