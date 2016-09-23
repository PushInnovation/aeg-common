import { DateConversions } from '../../src/index';
import moment from 'moment-timezone';
import should from 'should';

describe('dateConversions', async () => {

	it('should not error', async () => {

		const result = DateConversions.momentToString(moment());
		should.exist(result);
		result.should.be.a.String;

	});

});
