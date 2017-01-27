import { EventEmitter } from 'events';
import Promise from 'bluebird';

/**
 * Retry a delegate function until it completes successfully or exhausts the available attempts
 * @param {number} retries
 * @param {number} delay
 * @param {function} delegate
 * @returns {Promise.<*>}
 */
export default async function retryWhilst (retries, delay, delegate) {

	const emitter = new EventEmitter();

	let tries = 0;
	let done = false;
	let lastErr = null;

	while (tries < retries && !done) {

		try {

			await Promise.resolve(delegate(tries + 1));

			done = true;

		} catch (ex) {

			lastErr = ex;

			emitter.emit('warn', {message: 'Attempt failed', attempt: tries + 1, of: retries, err: ex});

		}

		await Promise.delay(delay);

		tries++;

	}

	if (!done) {

		throw new RetryWhilstError('retry whilst failed to complete', lastErr);

	}

	return emitter;

}

/**
 * Retry whilst error
 */
class RetryWhilstError extends Error {

	constructor (message, err) {

		super();

		this.message = message;
		this._innerError = err;

	}

}
