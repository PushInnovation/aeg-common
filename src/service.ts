import { ILogger } from '@adexchange/aeg-logger';
import Base from './base';
import moment from 'moment-timezone';
import ServiceStoppedError from './errors/service-stopped-error';

export interface IServiceVersion {
	name: string;
	build: string;
	sha: string;
}

/**
 * Basic service
 */
export default class Service extends Base {

	private _productionOnly: boolean;
	private _initialized: boolean;
	private _running: boolean;
	private _stop: boolean;
	private _version?: IServiceVersion;

	/**
	 * Constructor
	 * @param {{productionOnly: boolean, logger: Object}} [options]
	 */
	constructor (options: {logger?: ILogger, productionOnly?: boolean, version?: IServiceVersion} = {}) {

		options = options || {};

		super(options);

		this._productionOnly = options.productionOnly || false;
		this._initialized = false;
		this._running = false;
		this._stop = false;
		this._version = options.version;

	}

	/**
	 * Initialize
	 */
	public async init (): Promise<void> {

		if (!this._initialized) {

			this._initialized = true;
			return this._serviceInitialized();

		}

	}

	/**
	 * Start the service
	 * @param {object} [options]
	 */
	public async start (options: object = {}): Promise<void> {

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

		this.info('start', {message: 'starting'});

		const startTime = moment.tz('UTC');
		let lastEx;

		try {

			await this.init();
			await this._serviceStarted(options);

		} catch (ex) {

			lastEx = ex;

		}

		this._running = false;

		const endTime = moment.tz('UTC');
		const timeDiff = endTime.diff(startTime, 'minutes', true);

		if (lastEx && lastEx.code !== 'STOP') {

			this.error('start', {data: {timeDiff}, err: lastEx});

			throw lastEx;

		} else {

			if (this._stop) {

				this.info('start', {message: 'stopped', data: {timeDiff}});

			} else {

				this.info('start', { message: 'started', data: { timeDiff, version: this._version } });

			}

		}

	}

	/**
	 * Stop the service
	 */
	public async stop (): Promise<void> {

		this.info('stop');
		this._stop = true;
		return this._serviceStopped();

	}

	/**
	 * Runs a delegate if the service is not stopped
	 * @param delegate
	 */
	public async checkStopped (delegate: () => Promise<void>): Promise<void> {

		if (!this._stop) {

			return delegate();

		} else {

			throw new ServiceStoppedError();

		}

	}

	/**
	 * Dispose
	 */
	public async dispose (): Promise<void> {

		if (this._initialized) {

			this._initialized = false;
			return this._serviceDisposed();

		}

	}

	/**
	 * Initialized - override
	 * @private
	 */
	protected async _serviceInitialized (): Promise<void> {

		return;

	}

	/**
	 * Service started - override
	 * @param {object} [options]
	 * @private
	 */
	protected async _serviceStarted (options?: object): Promise<void> {

		return;

	}

	/**
	 * Service stopped - override
	 * @private
	 */
	protected async _serviceStopped (): Promise<void> {

		return;

	}

	/**
	 * Disposed - override
	 * @private
	 */
	protected async _serviceDisposed (): Promise<void> {

		return;

	}

}
