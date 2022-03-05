import { faker } from '@faker-js/faker';

import { Version } from '../src';

describe('Version', () => {
	let major: number;

	beforeEach(() => {
		major = faker.datatype.number();
	});

	it('should instanciate with a major number, a minor number and a patch number', () => {
		expect(() => new Version()).not.toBeNull();
	});
});
