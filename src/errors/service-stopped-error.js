/**
 * Service stopped error
 */
export class ServiceStoppedError extends Error {

	code: string;

	/**
	 * constructor
	 */
	constructor () {

		super();

		this.message = 'STOP';
		this.code = 'STOP';

	}

}
