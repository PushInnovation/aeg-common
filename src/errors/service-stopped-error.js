/**
 * Service stopped error
 */
export class ServiceStoppedError extends Error {

	_code: string;

	/**
	 * Gets the error code
	 * @returns {string}
	 */
	get code (): string {

		return this._code;

	}

	/**
	 * constructor
	 */
	constructor () {

		super('STOP');

		this._code = 'STOP';

	}

}
