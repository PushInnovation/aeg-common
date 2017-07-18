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
	delegate: (attempts: number) => Promise<T | null>,
	emitter?: EventEmitter)
	: Promise<T | null> {

	let tries: number = 0;
	let done: boolean = false;
	let lastErr: Error | null = null;
	let cancelled: boolean = false;
	let result: T | null = null;

	while (tries < retries && !done && !cancelled) {

		try {

			result = await Promise.resolve(delegate(tries + 1));

			done = true;

		} catch (ex) {

			if (ex instanceof RetryWhilstCancelError) {

				if (ex.innerError) {

					throw ex.innerError;

				} else {

					cancelled = true;

				}

			} else {

				lastErr = ex;

				if (emitter) {

					emitter.emit('warn', {message: 'Attempt failed', data: {attempt: tries + 1, of: retries}, err: ex});

				}

			}

			if (!cancelled) {

				await BBPromise.delay(delay);

				tries++;

			}

		}

	}

	if (!done && !cancelled) {

		throw lastErr;

	}

	return result;

}
