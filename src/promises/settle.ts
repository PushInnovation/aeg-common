import * as Bluebird from 'bluebird';
import * as BBPromise from 'bluebird';

/**
 * Settle a collection of promises
 */
export default async function settle (promises: Array<Bluebird<any> | Promise<any>>): Promise<any[]> {

	const inspections = await Promise.all(promises.map((promise) => {

		return BBPromise.resolve(promise).reflect();

	}));

	const ex = inspections.find(
		(r) => {

			return !r.isFulfilled();

		});

	if (ex) {

		// throw the first exception once all promises have resolved
		throw ex.reason();

	}

	return inspections.map((i) => i.value());

}
