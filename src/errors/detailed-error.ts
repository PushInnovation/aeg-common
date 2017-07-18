export default class DetailedError<TDetails> extends Error {

	public details: TDetails;

	constructor (message: string, details: TDetails) {

		super(message);

		// Remove this when we target es2015+
		Object.setPrototypeOf(this, DetailedError.prototype);

		this.details = details;

	}

}
