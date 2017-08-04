/**
 * Cancel a service interval
 */
export default class ServiceIntervalCancelError extends Error {

	private _innerError: Error | undefined;

	/**
	 * Returns the inner error
	 */
	get innerError (): Error | undefined {

		return this._innerError;

	}

	/**
	 * Constructor
	 */
	constructor (options: { message?: string, innerError?: Error } = {}) {

		super(options.message || 'Service interval cancelled');

		// Remove this when we target es2015+
		Object.setPrototypeOf(this, ServiceIntervalCancelError.prototype);

		this._innerError = options.innerError;

	}

}
