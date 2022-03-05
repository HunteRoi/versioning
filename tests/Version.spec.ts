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

	it('should instanciate with an empty pre-release', () => {
		const version = new Version();
		expect(version.preRelease).toBeNull();
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

	describe('incrementMinor', () => {
		it('should increment minor by one, set patch number to 0 and not update major number', () => {
			const version = new Version();
			const expectedMajor = version.major;
			const expectedMinor = version.minor + 1;
			const expectedPatch = 0;

			version.incrementMinor();

			expect(version.major).toEqual(expectedMajor);
			expect(version.minor).toEqual(expectedMinor);
			expect(version.patch).toEqual(expectedPatch);
		});
	});

	describe('incrementPatch', () => {
		it('should increment patch by one, and not update major and minor numbers', () => {
			const version = new Version();
			const expectedMajor = version.major;
			const expectedMinor = version.minor;
			const expectedPatch = version.patch + 1;

			version.incrementPatch();

			expect(version.major).toEqual(expectedMajor);
			expect(version.minor).toEqual(expectedMinor);
			expect(version.patch).toEqual(expectedPatch);
		});
	});

	describe('setPreRelease', () => {
		it('should change the pre-release suffix', () => {
			const version = new Version();
			const expected = faker.datatype.string();

			version.setPreRelease(expected);

			expect(version.preRelease).toBe(expected);
		});
	});
});
