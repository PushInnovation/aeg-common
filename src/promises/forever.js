import Promise from 'bluebird';

export default async function forever (delegate) {

	return Promise.coroutine(function* (delegate) {

		let done = false;

		while (!done) {

			done = yield delegate();

		}

	})(delegate);

}
