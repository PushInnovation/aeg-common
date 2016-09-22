import {EventEmitter} from 'events';
import _ from 'lodash';

/**
 * Base class for common operations
 */
class Base extends EventEmitter {

	/**
	 * Constructor
	 * @param {Object} options
	 */
	constructor (options = {}) {

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
	parseOptions (args) {

		return (args.length > 0 ? args.shift() : {}) || {};

	}

	/**
	 * Emit an event
	 * @param {string} event
	 * @param {string} caller
	 * @param {Object} options
	 */
	emit (event, caller, options = {}) {

		const body = {};

		if (options.message) {

			body.message = `${_.camelCase(this.constructor.name)}#${caller}: ` + options.message;

		}

		if (options.data) {

			body.data = options.data;

		}

		if (options.err) {

			body.err = options.err;

		}

		super.emit(event, body);

	}

	/**
	 * Log debug
	 * @param {string} caller
	 * @param {Object} options
	 */
	debug (caller, options = {}) {

		if (this._logger) {

			this._log(this._logger.debug, caller, options);

		}

	}

	/**
	 * Log info
	 * @param {string} caller
	 * @param {Object} options
	 */
	info (caller, options = {}) {

		if (this._logger) {

			this._log(this._logger.info, caller, options);

		}

	}

	/**
	 * Log warn
	 * @param {string} caller
	 * @param {Object} options
	 */
	warn (caller, options = {}) {

		if (this._logger) {

			this._log(this._logger.warn, caller, options);

		}

	}

	/**
	 * Log error
	 * @param {string} caller
	 * @param {Object} options
	 */
	error (caller, options = {}) {

		if (this._logger) {

			this._log(this._logger.error, caller, options);

		}

	}

	/**
	 * Internal log handler
	 * @param {function} delegate
	 * @param {string} caller
	 * @param {Object} options
	 * @private
	 */
	_log (delegate, caller, options = {}) {

		if (!this._logger) {

			return;

		}

		let logMessage;

		if (options.message) {

			logMessage = `${_.camelCase(this.constructor.name)}#${caller}: ${options.message}`;

		} else {

			logMessage = `${_.camelCase(this.constructor.name)}#${caller}`;

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
