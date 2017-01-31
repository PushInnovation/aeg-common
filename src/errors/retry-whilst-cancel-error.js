// @flow

/**
 * Cancel a retry whilst
 */
export default class RetryWhilstCancelError extends Error {

	_innerError: ?Error;

	/**
	 * Returns the inner error
	 * @returns {?Error}
	 */
	get innerError (): ?Error {

		return this._innerError;

	}

	/**
	 * Constructor
	 * @param {string} message
	 * @param {Error} innerError
	 */
	constructor (message: string, innerError: ?Error) {

		super(message);

		this._innerError = innerError;

	}

}
