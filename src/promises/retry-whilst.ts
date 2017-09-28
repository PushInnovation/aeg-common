import { EventEmitter } from 'events';
import { Promise as BBPromise } from 'bluebird';
import RetryWhilstCancelError from '../errors/retry-whilst-cancel-error';

/**
 * Retry a delegate function until it completes successfully or exhausts the available attempts
 * Throw a RetryWhilstCancelError to cancel.  Use it's inner error to bubble up an exception that caused it to cancel
 * The function throws the last delegate's exception or the cancel's inner exception
 */
export default async function retryWhilst<T> (
	retries: number,
	delay: number,
	delegate: (attempts: number) => Promise<T | undefined>,
	emitter?: EventEmitter): Promise<T | undefined> {

	let tries: number = 0;
	let lastErr: Error | null = null;

	while (tries < retries) {

		try {

			return await Promise.resolve(delegate(tries + 1));

		} catch (ex) {

			if (ex instanceof RetryWhilstCancelError) {

				if (ex.innerError) {

					throw ex.innerError;

				} else {

					return;

				}

			} else {

				lastErr = ex;

				if (emitter) {

					emitter.emit('warn', {message: 'Attempt failed', data: {attempt: tries + 1, of: retries}, err: ex});

				}

				await BBPromise.delay(delay);

				tries++;

			}

		}

	}

	throw lastErr;

}
