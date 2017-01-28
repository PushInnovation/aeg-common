// @flow

import type { ILogger } from './flow-typed/i-logger';
import Base from './base';
import moment from 'moment-timezone';
import ServiceStoppedError from './errors/service-stopped-error';

/**
 * Basic service
 */
class Service extends Base {

	_productionOnly: boolean;
	_initialized: boolean;
	_running: boolean;
	_stop: boolean;

	/**
	 * Constructor
	 * @param {{productionOnly: boolean, logger: Object}} [options]
	 */
	constructor (options: {logger?: ILogger, productionOnly?: boolean} = {}): void {

		options = options || {};

		super(options);

		this._productionOnly = options.productionOnly || false;
		this._initialized = false;
		this._running = false;
		this._stop = false;

	}

	/**
	 * Initialize
	 */
	async init (): Promise<void> {

		if (!this._initialized) {

			this._initialized = true;
			return this._serviceInitialized();

		}

	}

	/**
	 * Initialized - override
	 * @private
	 */
	async _serviceInitialized (): Promise<void> {

	}

	/**
	 * Start the service
	 * @param {Object} [options]
	 */
	async start (options: ?Object = {}): Promise<void> {

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

			this.error('start', {data: {timeDiff}, err: lastEx});

			throw lastEx;

		} else {

			if (this._stop) {

				this.info('start', {message: 'stopped', data: {timeDiff}});

			} else {

				this.info('start', {message: 'complete', data: {timeDiff}});

			}

		}

	}

	/**
	 * Service started - override
	 * @param {Object} [options]
	 * @private
	 */
	async _serviceStarted (options: ?Object): Promise<void> {

	}

	/**
	 * Stop the service
	 */
	async stop (): Promise<void> {

		this.info('stop');
		this._stop = true;
		return this._serviceStopped();

	}

	/**
	 * Service stopped - override
	 * @private
	 */
	async _serviceStopped (): Promise<void> {

	}

	/**
	 * Runs a delegate if the service is not stopped
	 * @param delegate
	 */
	async checkStopped (delegate: () => Promise<void>): Promise<void> {

		if (!this._stop) {

			return delegate();

		} else {

			throw new ServiceStoppedError();

		}

	}

	/**
	 * Dispose
	 */
	async dispose (): Promise<void> {

		if (this._initialized) {

			this._initialized = false;
			return this._serviceDisposed();

		}

	}

	/**
	 * Disposed - override
	 * @private
	 */
	async _serviceDisposed (): Promise<void> {

	}

}

export default Service;

