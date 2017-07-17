import { DateConversions } from '../../src/index';
import * as moment from 'moment-timezone';
import * as should from 'should';
import 'mocha';

describe('dateConversions', async () => {

	it('should not error', async () => {

		const result: any = DateConversions.momentToString(moment());
		should.exist(result);
		result.should.be.a.String();

	});

	it('resolveUTCIntervals - minutely', async () => {

		const result = DateConversions.resolveUTCIntervals('minutely', 'America/New_York');
		should.exist(result);

	});

	it('resolveUTCIntervals - hourly', async () => {

		const result = DateConversions.resolveUTCIntervals('hourly', 'America/New_York');
		should.exist(result);

	});

	it('resolveUTCIntervals - last-hour', async () => {

		const result = DateConversions.resolveUTCIntervals('last-hour', 'America/New_York');
		should.exist(result);

	});

	it('resolveUTCIntervals - daily', async () => {

		const result = DateConversions.resolveUTCIntervals('daily', 'America/New_York');
		should.exist(result);

	});

	it('resolveUTCIntervals - yesterday', async () => {

		const result = DateConversions.resolveUTCIntervals('yesterday', 'America/New_York');
		should.exist(result);

	});

	it('resolveUTCIntervals - weekly', async () => {

		const result = DateConversions.resolveUTCIntervals('weekly', 'America/New_York');
		should.exist(result);

	});

	it('resolveUTCIntervals - last-week', async () => {

		const result = DateConversions.resolveUTCIntervals('last-week', 'America/New_York');
		should.exist(result);

	});

	it('resolveUTCIntervals - monthly', async () => {

		const result = DateConversions.resolveUTCIntervals('monthly', 'America/New_York');
		should.exist(result);

	});

	it('resolveUTCIntervals - yearly', async () => {

		const result = DateConversions.resolveUTCIntervals('yearly', 'America/New_York');
		should.exist(result);

	});

	it('resolveUTCIntervals - none', async () => {

		try {

			DateConversions.resolveUTCIntervals('none', 'America/New_York');
			throw new Error('Should have failed');

		} catch (ex) {

			// expected

		}

	});

});
