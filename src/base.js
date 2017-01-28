// @flow

import type { ILogger } from './flow-typed/i-logger';
import type { ILoggerOptions } from './flow-typed/i-logger-options';
import EventEmitter from 'events';
import _ from 'lodash';

/**
 * Base class for common operations
 */
class Base extends EventEmitter {

	_logger: ILogger;

	/**
	 * Constructor
	 * @param {Object} options
	 */
	constructor (options: {logger?: ILogger} = {}): void {

		super();

		if (options.logger) {

			this._logger = options.logger;

		}

	}

	/**
	 * Returns an options object from an argument array
	 * Use this for options in a node-back style function
	 *
	 * function(someArg, options, callback)
	 *      let args = Array.prototype.slice.call(arguments);
	 *      someArg = args.shift();
	 *      callback = args.pop();
	 *      options = this._parseOptions(args);
	 *
	 * @param {Object[]} args
	 * @returns {*|{}}
	 * @private
	 */
	parseOptions (args: Object[]): Object {

		return (args.length > 0 ? args.shift() : {}) || {};

	}

	/**
	 * Emit an event
	 * @param {string} event
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	emit (event: string, caller: string, options: ILoggerOptions = {}): boolean {

		const body = {};

		body.message = `${_.camelCase(this.constructor.name)}#${caller}`;

		if (options.message) {

			body.message += `: ${options.message}`;

		}

		if (options.data) {

			body.data = options.data;

		}

		if (options.err) {

			body.err = options.err;

		}

		return super.emit(event, body);

	}

	/**
	 * Log debug
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	debug (caller: string, options: ILoggerOptions = {}): void {

		if (this._logger) {

			this._log(this._logger.debug, caller, options);

		}

	}

	/**
	 * Log info
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	info (caller: string, options: ILoggerOptions = {}): void {

		if (this._logger) {

			this._log(this._logger.info, caller, options);

		}

	}

	/**
	 * Log warn
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	warn (caller: string, options: ILoggerOptions = {}): void {

		if (this._logger) {

			this._log(this._logger.warn, caller, options);

		}

	}

	/**
	 * Log error
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 */
	error (caller: string, options: ILoggerOptions = {}): void {

		if (this._logger) {

			this._log(this._logger.error, caller, options);

		}

	}

	/**
	 * Internal log handler
	 * @param {function} delegate
	 * @param {string} caller
	 * @param {ILoggerOptions} options
	 * @private
	 */
	_log (delegate: (message: string, data: ?Object) => void, caller: string, options: ILoggerOptions = {}): void {

		if (!this._logger) {

			return;

		}

		let logMessage = `${_.camelCase(this.constructor.name)}#${caller}`;

		if (options.message) {

			logMessage += `: ${options.message}`;

		}

		if (options.data) {

			if (options.err) {

				this._logger.errorWithMessage(logMessage, options.data, options.err);

			} else {

				delegate(logMessage, options.data);

			}

		} else {

			if (!options.data && options.err) {

				this._logger.errorWithMessage(logMessage, options.err);

			} else {

				delegate(logMessage);

			}

		}

	}

}

export default Base;
