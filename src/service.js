import moment from 'moment-timezone';

/**
 * Basic service
 */
class Service {

	/**
	 * Constructor
	 * @param {{productionOnly: boolean, logger: Object}} [options]
	 */
	constructor (options) {

		options = options || {};

		this._name = this.constructor.name;
		this._productionOnly = options.productionOnly;
		this._logger = options.logger || {
				debug: () => {
				}, info: () => {
				}, warn: () => {
				}, error: () => {
				}, errorWithMessage: () => {
				}
			};
		this._initialized = false;
		this._running = false;
		this._stop = false;

	}

	/**
	 * Initialize
	 */
	async init () {

		if (!this._initialized) {

			this._initialized = true;
			return this._serviceInitialized();

		}

	}

	/**
	 * Initialized - override
	 * @private
	 */
	async _serviceInitialized () {

	}

	/**
	 * Start the service
	 * @param {Object} [options]
	 */
	async start (options) {

		options = options || {};

		if (this._productionOnly && process.env.NODE_ENV !== 'production') {

			this._warn('start', {message: 'skipping, production only'});
			return;

		}

		if (this._running) {

			this._info('start', {message: 'already running'});
			return;

		}

		this._running = true;
		this._stop = false;

		this._info('start', {message: 'start'});

		let startTime = moment.tz('UTC');
		let lastEx;

		try {

			await this.init();
			await this._serviceStarted(options);

		} catch (ex) {

			lastEx = ex;

		}

		this._running = false;

		const endTime = moment.tz('UTC');
		const timeDiff = startTime.diff(endTime, 'minutes', true);

		if (lastEx && lastEx.code !== 'STOP') {

			this._error('start', {obj: {timeDiff}, lastEx});

			throw lastEx;

		} else {

			if (this._stop) {

				this._info('start', {message: 'stopped', obj: {timeDiff}});

			} else {

				this._info('start', {message: 'complete', obj: {timeDiff}});

			}

		}

	}

	/**
	 * Service started - override
	 * @param {Object} [options]
	 * @private
	 */
	async _serviceStarted (options) {

	}

	/**
	 * Stop the service
	 */
	async stop () {

		this._info('stop');
		this._stop = true;
		return this._serviceStopped();

	}

	/**
	 * Service stopped - override
	 * @private
	 */
	async _serviceStopped () {

	}

	/**
	 * Dispose
	 */
	async dispose () {

		if (this._initialized) {

			this._initialized = false;
			return this._serviceDisposed();

		}

	}

	/**
	 * Disposed - override
	 * @private
	 */
	async _serviceDisposed () {

	}

	/**
	 * Log debug
	 * @param {string} method
	 * @param {Object} [options]
	 * @private
	 */
	_debug (method, options) {

		this._log(this._logger.debug, method, options);

	}

	/**
	 * Log info
	 * @param {string} method
	 * @param {Object} [options]
	 * @private
	 */
	_info (method, options) {

		this._log(this._logger.info, method, options);

	}

	/**
	 * Log warn
	 * @param {string} method
	 * @param {Object} [options]
	 * @private
	 */
	_warn (method, options) {

		this._log(this._logger.warn, method, options);

	}

	/**
	 * Log error
	 * @param {string} method
	 * @param {Object} [options]
	 * @private
	 */
	_error (method, options) {

		this._log(this._logger, method, options);

	}

	/**
	 * Log internal
	 * @param {function} delegate
	 * @param {string} method
	 * @param {Object} [options]
	 * @private
	 */
	_log (delegate, method, options) {

		options = options || {};

		let logMessage;

		if (options.message) {

			logMessage = `${this._name}#${method}:${options.message}`;

		} else {

			logMessage = `${this._name}#${method}`;

		}

		if (options.obj) {

			if (options.err) {

				this._logger.errorWithMessage(logMessage, options.obj, options.err);

			} else {

				delegate(logMessage, options.obj);

			}

		} else {

			if ((!options.obj && options.err)) {

				this._logger.errorWithMessage(logMessage, options.err);

			} else {

				delegate(logMessage);

			}

		}

	}

}

export default Service;
