import async from 'async';
import Promise from 'bluebird';

/**
 * Run an array of promises with a set concurrency limit
 * @param {Object[]} arr
 * @param {number} limit
 * @param {Function} delegate
 */
export default async function eachLimit (arr, limit, delegate) {

	const eachLimit = Promise.promisify(async.eachLimit, {context: async});
	return eachLimit(arr, limit, (value, callback) => {

		Promise.resolve(delegate(value))
			.then(() => {

				callback();

			})
			.catch((err) => {

				callback(err);

			});

	});

}
