import { Logger } from '@adexchange/aeg-logger';
import Base from './base';
import { ILoggerOptions } from './base';
import * as _ from 'lodash';

/**
 * Base class with an id
 */
export default class BaseId extends Base {

	private _id: string;

	/**
	 * Constructor
	 * @param {string} id
	 * @param {object} options
	 */
	constructor (id: string, options: {logger?: Logger} = {}) {

		super(options);

		this._id = id;

	}

	/**
	 * Get the id
	 * @returns {*}
	 */
	get id (): string {

		return this._id;

	}

	/**
	 * Emit an event
	 * @param {string} event
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	public emit (event: string, caller: string, options: ILoggerOptions = {}): boolean {

		const data = {};
		data[_.camelCase(this.constructor.name)] = {};
		data[_.camelCase(this.constructor.name)].id = this._id;
		options.data = options.data ? _.extend(options.data, data) : data;
		return super.emit(event, caller, options);

	}

	/**
	 * Log debug
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	public debug (caller: string, options: ILoggerOptions = {}): void {

		super.debug(caller, this._resolveLogData(options));

	}

	/**
	 * Log info
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	public info (caller: string, options: ILoggerOptions = {}): void {

		super.info(caller, this._resolveLogData(options));

	}

	/**
	 * Log warn
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	public warn (caller: string, options: ILoggerOptions = {}): void {

		super.warn(caller, this._resolveLogData(options));

	}

	/**
	 * Log error
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	public error (caller: string, options: ILoggerOptions = {}): void {

		super.error(caller, this._resolveLogData(options));

	}

	/**
	 * Resolves the log data with this's id
	 * @param {ILoggerOptions} options
	 * @returns {*}
	 * @private
	 */
	private _resolveLogData (options: ILoggerOptions = {}): ILoggerOptions {

		const data = {id: this._id};

		if (options.data) {

			delete options.data.id;
			options.data = _.extend(data, options.data);

		} else {

			options.data = data;

		}

		return options;

	}

}
