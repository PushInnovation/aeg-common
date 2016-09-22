import forever from '../../src/promises/forever';
import Promise from 'bluebird';

describe('while', async () => {

	it('should not error', async () => {

		let cycles = 0;

		await forever(async () => {

			cycles++;

			if (cycles > 10) {

				return true;

			}

			return Promise.delay(100);

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

				return Promise.delay(500);

			});

		} catch (ex) {

			return;

		}

		throw new Error();

	});

});