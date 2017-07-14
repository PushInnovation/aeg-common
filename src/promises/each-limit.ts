import async from 'async';
import { Promise as BBPromise } from 'bluebird';

/**
 * Run an array of promises with a set concurrency limit
 * @param {Object[]} arr
 * @param {number} limit
 * @param {Function} delegate
 */
export default async function eachLimit<T> (arr: T[], limit: number, delegate: (value: T) => BBPromise<void>)
	: BBPromise<void> {

	const el = BBPromise.promisify(async.eachLimit, {context: async});
	return el(arr, limit, (value, callback) => {

		BBPromise.resolve(delegate(value))
			.then(() => {

				callback();

				return null;

			})
			.catch((err) => {

				callback(err);

			});

	});

}
