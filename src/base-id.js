// @flow

import type { ILogger } from './flow-typed/i-logger';
import type { ILoggerOptions } from './flow-typed/i-logger-options';
import Base from './base';
import _ from 'lodash';

/**
 * Base class with an id
 */
class BaseId extends Base {

	_id: number;

	/**
	 * Constructor
	 * @param {number} id
	 * @param {Object} options
	 */
	constructor (id: number, options: {logger?: ILogger} = {}): void {

		super(options);

		this._id = id;

	}

	/**
	 * Get the id
	 * @returns {*}
	 */
	get id (): number {

		return this._id;

	}

	/**
	 * Emit an event
	 * @param {string} event
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	emit (event: string, caller: string, options: ILoggerOptions = {}): boolean {

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
	debug (caller: string, options: ILoggerOptions = {}): void {

		super.debug(caller, this._resolveLogData(options));

	}

	/**
	 * Log info
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	info (caller: string, options: ILoggerOptions = {}): void {

		super.info(caller, this._resolveLogData(options));

	}

	/**
	 * Log warn
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	warn (caller: string, options: ILoggerOptions = {}): void {

		super.warn(caller, this._resolveLogData(options));

	}

	/**
	 * Log error
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	error (caller: string, options: ILoggerOptions = {}): void {

		super.error(caller, this._resolveLogData(options));

	}

	/**
	 * Resolves the log data with this's id
	 * @param {ILoggerOptions} options
	 * @returns {*}
	 * @private
	 */
	_resolveLogData (options: ILoggerOptions = {}): ILoggerOptions {

		const data: Object = {id: this._id};

		if (options.data) {

			delete options.data.id;
			options.data = _.extend(data, options.data);

		} else {

			options.data = data;

		}

		return options;

	}

}

export default BaseId;
