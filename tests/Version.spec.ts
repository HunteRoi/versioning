import { faker } from '@faker-js/faker';

import { Version } from '../src';

describe('Version', () => {
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

	describe('incrementMajor', () => {
		it('should increment major by one, and set minor and patch numbers to 0', () => {
			const version = new Version();
			const expectedMajor = version.major + 1;
			const expectedMinor = 0;
			const expectedPatch = 0;

			version.incrementMajor();

			expect(version.major).toEqual(expectedMajor);
			expect(version.minor).toEqual(expectedMinor);
			expect(version.patch).toEqual(expectedPatch);
		});
	});
});
