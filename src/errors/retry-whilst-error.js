/**
 * Retry whilst error
 */
export class RetryWhilstError extends Error {

	_innerError: ?Error;

	/**
	 * Constructor
	 * @param {string} message
	 * @param {Error} err
	 */
	constructor (message: string, err: ?Error) {

		super();

		this.message = message;
		this._innerError = err;

	}

}
