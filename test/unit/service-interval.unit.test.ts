import { ServiceInterval } from '../../src/service-interval';
import ServiceIntervalCancelError from '../../src/errors/service-interval-cancel-error';
import * as should from 'should';
import { IServiceVersion } from '../../src/service';
import { ILogger } from '@push_innovation/aeg-logger';

class TestInterval extends ServiceInterval {

	public count: number;

	constructor (interval: number, options: { logger?: ILogger, productionOnly?: boolean, version?: IServiceVersion } = {}) {

		super(interval, options);

		this.count = 0;

	}

	protected _handler (): Promise<any> | any {

		console.log('Fire!');

		this.count++;

		if (this.count === 3) {

			throw new ServiceIntervalCancelError();

		}

	}

}

describe('serviceInterval', async () => {

	it('should complete', async () => {

		const service = new TestInterval(1);
		await service.start();
		should(service.count).be.equal(3);

	});

});
