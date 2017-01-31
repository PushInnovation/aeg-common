import retryWhilst from '../../src/promises/retry-whilst';
import RetryWhilstCancelError from '../../src/errors/retry-whilst-cancel-error';
import should from 'should';
import moment from 'moment-timezone';
import EventEmitter from 'events';

describe('retryWhilst', async () => {

	it('should complete', async () => {

		let attempts = 0;

		const result = await retryWhilst(3, 1000, async (attempt) => {

			attempts++;
			attempt.should.be.equal(1);

			return 'test';

		});

		attempts.should.be.equal(1);
		result.should.be.equal('test');

	});

	it('should complete but fail once', async () => {

		let attempts = 0;

		const result = await retryWhilst(3, 1000, async () => {

			attempts++;

			if (attempts === 1) {

				throw new Error('Fail');

			}

			return 'test';

		});

		attempts.should.be.equal(2);
		result.should.be.equal('test');

	});

	it('should not complete', async () => {

		let start = moment.tz();
		let attempts = 0;
		let err = null;

		try {

			const emitter = new EventEmitter();

			emitter.on('warn', (data) => {

				console.log(data);

			});

			await retryWhilst(3, 1000, async () => {

				attempts++;
				throw new Error('Fail');

			}, emitter);

		} catch (ex) {

			err = ex;

		}

		let end = moment.tz();

		attempts.should.be.equal(3);
		should.exist(err);
		const diff = end.diff(start, 'seconds');
		diff.should.be.aboveOrEqual(3);

	});

	it('should cancel', async () => {

		let attempts = 0;
		let err = null;

		try {

			await retryWhilst(3, 1000, async () => {

				attempts++;
				throw new RetryWhilstCancelError('something happened', new Error('Inner Error'));

			});

		} catch (ex) {

			err = ex;

		}

		attempts.should.be.equal(1);
		should.exist(err);
		err.innerError.message.should.be.equal('Inner Error');

	});

});
