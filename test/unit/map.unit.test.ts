import * as should from 'should';
import { Collections } from '../../src';

describe('map', async () => {

	it('should not error', async () => {

		const orig = new Map<string, number>([['test', 3]]);
		const obj = Collections.Map.mapToObj(orig);
		should(obj['test']).be.equal(3);
		const map = Collections.Map.objToMap(obj);
		should(map.get('test')).be.equal(3);

	});

});
