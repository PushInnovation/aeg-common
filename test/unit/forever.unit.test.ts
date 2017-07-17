import forever from '../../src/promises/forever';
import { Promise as BBPromise } from 'bluebird';

describe('forever', async () => {

	it('should not error', async () => {

		let cycles: any = 0;

		await forever(async () => {

			cycles++;

			if (cycles > 10) {

				return true;

			}

			return BBPromise.delay(100);

		});

		cycles.should.be.equal(11);

	});

	it('should error', async () => {

		let cycles = 0;

		try {

			await forever(async () => {

				cycles++;

				if (cycles === 2) {

					throw new Error('Kill it');

				}

				return BBPromise.delay(500);

			});

		} catch (ex) {

			return;

		}

		throw new Error();

	});

});
