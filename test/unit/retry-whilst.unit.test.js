import retryWhilst from '../../src/promises/retry-whilst';
import should from 'should';
import moment from 'moment-timezone';

describe('retryWhilst', async () => {

	it('should complete', async () => {

		let attempts = 0;

		await retryWhilst(3, 1000, async (attempt) => {

			attempts++;
			attempt.should.be.equal(1);

		});

		attempts.should.be.equal(1);

	});

	it('should not complete', async () => {

		let start = moment.tz();
		let attempts = 0;
		let err = null;

		try {

			await retryWhilst(3, 1000, async () => {

				attempts++;
				throw new Error('Fail');

			});

		} catch (ex) {

			err = ex;

		}

		let end = moment.tz();

		attempts.should.be.equal(3);
		should.exist(err);
		const diff = end.diff(start, 'seconds');
		diff.should.be.aboveOrEqual(3);

	});

});
