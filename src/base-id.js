import Base from './base';
import _ from 'lodash';

/**
 * Base class with an id
 */
class BaseId extends Base {

	/**
	 * Constructor
	 * @param {number} id
	 * @param {Object} options
	 */
	constructor (id, options = {}) {

		super(options);

		this._id = id;

	}

	/**
	 * Get the id
	 * @returns {*}
	 */
	get id () {

		return this._id;

	}

	/**
	 * Emit an event
	 * @param {string} event
	 * @param {string} caller
	 * @param {Object} options
	 */
	emit (event, caller, options = {}) {

		const data = {};
		data[_.camelCase(this.constructor.name)] = {};
		data[_.camelCase(this.constructor.name)].id = this._id;
		options.data = options.data ? _.extend(options.data, data) : data;
		super.emit(event, caller, options);

	}

	/**
	 * Log debug
	 * @param {string} caller
	 * @param {Object} options
	 */
	debug (caller, options = {}) {

		super.debug(caller, this._resolveLogData(options));

	}

	/**
	 * Log info
	 * @param {string} caller
	 * @param {Object} options
	 */
	info (caller, options = {}) {

		super.info(caller, this._resolveLogData(options));

	}

	/**
	 * Log warn
	 * @param {string} caller
	 * @param {Object} options
	 */
	warn (caller, options = {}) {

		super.warn(caller, this._resolveLogData(options));

	}

	/**
	 * Log error
	 * @param {string} caller
	 * @param {Object} options
	 */
	error (caller, options = {}) {

		super.error(caller, this._resolveLogData(options));

	}

	/**
	 * Resolves the log data with this's id
	 * @param {Object} options
	 * @returns {*}
	 * @private
	 */
	_resolveLogData (options) {

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

export default BaseId;
