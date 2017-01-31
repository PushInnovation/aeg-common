/**
 * Cancel a retry whilst
 */
export default class RetryWhilstCancelError extends Error {

	_innerError: ?Error;

	/**
	 * Returns the inner error
	 * @returns {?Error}
	 */
	get innerError (): Error {

		return this._innerError;

	}

	/**
	 * Constructor
	 * @param {string} message
	 * @param {Error} err
	 */
	constructor (message: string, err: ?Error) {

		super(message);

		this._innerError = err;

	}

}
