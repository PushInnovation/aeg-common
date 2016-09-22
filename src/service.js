import moment from 'moment-timezone';

/**
 * Basic service
 */
class Service extends Base {

	/**
	 * Constructor
	 * @param {{productionOnly: boolean, logger: Object}} [options]
	 */
	constructor (options) {

		options = options || {};

		super(options);

		this._productionOnly = options.productionOnly;
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

			this.warn('start', {message: 'skipping, production only'});
			return;

		}

		if (this._running) {

			this.info('start', {message: 'already running'});
			return;

		}

		this._running = true;
		this._stop = false;

		this.info('start', {message: 'start'});

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

			this.error('start', {obj: {timeDiff}, err: lastEx});

			throw lastEx;

		} else {

			if (this.stop) {

				this.info('start', {message: 'stopped', obj: {timeDiff}});

			} else {

				this.info('start', {message: 'complete', obj: {timeDiff}});

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

		this.info('stop');
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

}

export default Service;
