import Service, { IServiceVersion } from './service';
import { ILogger } from '@adexchange/aeg-logger';
import forever from './promises/forever';
import * as BBPromise from 'bluebird';
import ServiceIntervalCancelError from './errors/service-interval-cancel-error';

/**
 * Service that fires a handler on a repeating schedule
 */
export abstract class ServiceInterval extends Service {

	private _intervalInSeconds: number;

	constructor (
		intervalInSeconds: number,
		options: { logger?: ILogger, productionOnly?: boolean, version?: IServiceVersion } = {}) {

		super(options);

		this._intervalInSeconds = intervalInSeconds;

	}

	protected async _serviceStarted (options?: object): Promise<void> {

		try {

			await forever(async () => {

				try {

					await Promise.resolve(this._handler());

				} catch (ex) {

					if (ex instanceof ServiceIntervalCancelError) {

						this.warn('_serviceStarted: _handler cancelled', ex.innerError);
						throw ex;

					} else {

						this.error('_serviceStarted: _handler failed', ex);

					}

				}

				await BBPromise.delay(this._intervalInSeconds * 1000);

			}, this);

		} catch (ex) {

			if (!(ex instanceof ServiceIntervalCancelError)) {

				throw ex;

			}

		}

	}

	protected abstract _handler (): Promise<void> | void;

}
