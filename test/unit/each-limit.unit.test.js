import eachLimit from '../../src/promises/each-limit';
import Promise from 'bluebird';
import should from 'should';

describe('eachLimit', async () => {

	it('should not error with promise', async () => {

		let count = 0;

		await eachLimit([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, async (value) => {

			should.exist(value);

			count++;

			return Promise.delay(100);

		});

		count.should.be.equal(10);

	});

	it('should not error with static value', async () => {

		let count = 0;

		await eachLimit([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, async (value) => {

			should.exist(value);

			count++;

		});

		count.should.be.equal(10);

	});

});
