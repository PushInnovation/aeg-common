'use strict';

import logger from '@adexchange/aeg-logger';
import {EventEmitter} from 'events';

/**
 * Base class for common operations
 */
class Base extends EventEmitter {

	/**
	 * Emit an event
	 * @param {string} event
	 * @param {string} caller
	 * @param {Object} options
	 */
	emit(event, caller, options = {}) {

		const body = {};

		if (options.message) {
			body.message = `${this.constructor.name.toLower()}#${caller}: ` + options.message;
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
	debug(caller, options = {}) {
		this._log(logger.debug, caller, options);
	}

	/**
	 * Log info
	 * @param {string} caller
	 * @param {Object} options
	 */
	info(caller, options = {}) {
		this._log(logger.info, caller, options);
	}

	/**
	 * Log warn
	 * @param {string} caller
	 * @param {Object} options
	 */
	warn(caller, options = {}) {
		this._log(logger.warn, caller, options);
	}

	/**
	 * Log error
	 * @param {string} caller
	 * @param {Object} options
	 */
	error(caller, options = {}) {
		this._log(logger.error, caller, options);
	}

	/**
	 * Internal log handler
	 * @param {function} delegate
	 * @param {string} caller
	 * @param {Object} options
	 * @private
	 */
	_log(delegate, caller, options = {}) {

		let logMessage;

		if (options.message) {
			logMessage = `${this.constructor.name.toLower()}#${caller}: ${options.message}`;
		} else {
			logMessage = `${this.constructor.name.toLower()}#${caller}`;
		}

		if (options.data) {
			if (options.err) {
				logger.errorWithMessage(logMessage, options.data, options.err);
			} else {
				delegate(logMessage, options.data);
			}
		} else {
			if (!options.data && options.err) {
				logger.errorWithMessage(logMessage, options.err);
			} else {
				delegate(logMessage);
			}
		}
	}

}

export default Base;