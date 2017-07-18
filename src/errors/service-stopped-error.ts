/**
 * Service stopped error
 */
export default class ServiceStoppedError extends Error {

	private _code: string;

	/**
	 * Gets the error code
	 */
	get code (): string {

		return this._code;

	}

	/**
	 * constructor
	 */
	constructor () {

		super('STOP');

		// Remove this when we target es2015+
		Object.setPrototypeOf(this, ServiceStoppedError.prototype);

		this._code = 'STOP';

	}

}
