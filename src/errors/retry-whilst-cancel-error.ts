/**
 * Cancel a retry whilst
 */
export default class RetryWhilstCancelError extends Error {

	private _innerError: Error | undefined;

	/**
	 * Returns the inner error
	 * @returns {?Error}
	 */
	get innerError (): Error | undefined {

		return this._innerError;

	}

	/**
	 * Constructor
	 * @param {string} message
	 * @param {Error} innerError
	 */
	constructor (message: string, innerError?: Error) {

		super(message);

		// Remove this when we target es2015+
		Object.setPrototypeOf(this, RetryWhilstCancelError.prototype);

		this._innerError = innerError;

	}

}
