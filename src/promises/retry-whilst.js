// @flow

import EventEmitter from 'events';
import Promise from 'bluebird';
import RetryWhilstError from '../errors/retry-whilst-error';

/**
 * Retry a delegate function until it completes successfully or exhausts the available attempts
 * @param {number} retries
 * @param {number} delay
 * @param {function} delegate
 * @param {?EventEmitter} [emitter]
 * @returns {Promise.<*>}
 */
export default async function retryWhilst (retries: number, delay: number, delegate: (attempts: number) => Promise<void>, emitter: ?EventEmitter): Promise<EventEmitter> {

	let tries: number = 0;
	let done: boolean = false;
	let lastErr: ?Error = null;

	while (tries < retries && !done) {

		try {

			await Promise.resolve(delegate(tries + 1));

			done = true;

		} catch (ex) {

			lastErr = ex;

			if (emitter) {

				emitter.emit('warn', {message: 'Attempt failed', attempt: tries + 1, of: retries, err: ex});

			}

		}

		await Promise.delay(delay);

		tries++;

	}

	if (!done) {

		throw new RetryWhilstError('retry whilst failed to complete', lastErr);

	}

}
