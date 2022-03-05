import { faker } from '@faker-js/faker';

import { Version } from '../src';

describe('Version', () => {
	let major: number;

	beforeEach(() => {
		major = faker.datatype.number();
	});

	it('should instanciate properly', () => {
		const version = new Version();
		expect(version).not.toBeNull();
	});

	it('should instanciate with a major number', () => {
		const version = new Version();
		expect(version.major).toBeDefined();
	});

	it('should instanciate with a minor number', () => {
		const version = new Version();
		expect(version.minor).toBeDefined();
	});

	it('should instanciate with a patch number', () => {
		const version = new Version();
		expect(version.patch).toBeDefined();
	});
});
