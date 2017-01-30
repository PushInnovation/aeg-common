// @flow

import EventEmitter from 'events';
import Promise from 'bluebird';
import RetryWhilstError from '../errors/retry-whilst-error';
import RetryWhilstCancelError from '../errors/retry-whilst-cancel-error';

/**
 * Retry a delegate function until it completes successfully or exhausts the available attempts
 * @param {number} retries
 * @param {number} delay
 * @param {function} delegate
 * @param {?EventEmitter} [emitter]
 * @returns {Promise.<*>}
 */
export default async function retryWhilst (retries: number, delay: number, delegate: (attempts: number) => Promise<void>, emitter: ?EventEmitter): Promise<any> {

	let tries: number = 0;
	let done: boolean = false;
	let lastErr: ?Error = null;
	let result = null;
	let cancelled = false;

	while (tries < retries && !done && !cancelled) {

		try {

			result = await Promise.resolve(delegate(tries + 1));

			done = true;

		} catch (ex) {

			if (ex instanceof RetryWhilstCancelError) {

				cancelled = true;

			} else {

				lastErr = ex;

				if (emitter) {

					emitter.emit('warn', {message: 'Attempt failed', data: {attempt: tries + 1, of: retries}, err: ex});

				}

			}

		}

		if (!done && !cancelled) {

			await Promise.delay(delay);

			tries++;

		}

	}

	if (!done || cancelled) {

		throw new RetryWhilstError('retry whilst failed to complete', lastErr);

	}

	return result;

}
