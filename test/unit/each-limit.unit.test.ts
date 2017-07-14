import eachLimit from '../../src/promises/each-limit';
import { Promise as BBPromise } from 'bluebird';
import should from 'should';

describe('eachLimit', async () => {

	it('should not error with promise', async () => {

		let count: any = 0;

		await eachLimit([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, async (value) => {

			should.exist(value);

			count++;

			return BBPromise.delay(100);

		});

		count.should.be.equal(10);

	});

	it('should not error with static value', async () => {

		let count: any = 0;

		await eachLimit([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, async (value) => {

			should.exist(value);

			count++;

		});

		count.should.be.equal(10);

	});

});
