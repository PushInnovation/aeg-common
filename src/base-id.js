// @flow

import type { LoggerType, LoggerOptionsType } from './flow-typed/types';
import Base from './base';
import _ from 'lodash';

/**
 * Base class with an id
 */
class BaseId extends Base {

	_id: string;

	/**
	 * Constructor
	 * @param {string} id
	 * @param {Object} options
	 */
	constructor (id: string, options: {logger?: LoggerType} = {}): void {

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
	emit (event: string, caller: string, options: LoggerOptionsType = {}): boolean {

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
	debug (caller: string, options: LoggerOptionsType = {}): void {

		super.debug(caller, this._resolveLogData(options));

	}

	/**
	 * Log info
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	info (caller: string, options: LoggerOptionsType = {}): void {

		super.info(caller, this._resolveLogData(options));

	}

	/**
	 * Log warn
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	warn (caller: string, options: LoggerOptionsType = {}): void {

		super.warn(caller, this._resolveLogData(options));

	}

	/**
	 * Log error
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	error (caller: string, options: LoggerOptionsType = {}): void {

		super.error(caller, this._resolveLogData(options));

	}

	/**
	 * Resolves the log data with this's id
	 * @param {ILoggerOptions} options
	 * @returns {*}
	 * @private
	 */
	_resolveLogData (options: LoggerOptionsType = {}): LoggerOptionsType {

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
