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

	it('should instanciate with an empty build', () => {
		const version = new Version();
		expect(version.build).toBeNull();
	});

	it('should instanciate with the given major, minor, patch, preRelease and build values', () => {
		const major = faker.datatype.number();
		const minor = faker.datatype.number();
		const patch = faker.datatype.number();
		const preRelease = faker.datatype.string();
		const build = faker.datatype.string();

		const version = new Version(major, minor, patch, preRelease, build);

		expect(version.major).toBe(major);
		expect(version.minor).toBe(minor);
		expect(version.patch).toBe(patch);
		expect(version.preRelease).toBe(preRelease);
		expect(version.build).toBe(build);
	});

	describe('incrementMajor', () => {
		it('should increment major by one, and set minor and patch numbers to 0', () => {
			const version = new Version();
			const expectedMajor = version.major + 1;
			const expectedMinor = 0;
			const expectedPatch = 0;

			version.incrementMajor();

			expect(version.major).toBe(expectedMajor);
			expect(version.minor).toBe(expectedMinor);
			expect(version.patch).toBe(expectedPatch);
		});
	});

	describe('incrementMinor', () => {
		it('should increment minor by one, set patch number to 0 and not update major number', () => {
			const version = new Version();
			const expectedMajor = version.major;
			const expectedMinor = version.minor + 1;
			const expectedPatch = 0;

			version.incrementMinor();

			expect(version.major).toBe(expectedMajor);
			expect(version.minor).toBe(expectedMinor);
			expect(version.patch).toBe(expectedPatch);
		});
	});

	describe('incrementPatch', () => {
		it('should increment patch by one, and not update major and minor numbers', () => {
			const version = new Version();
			const expectedMajor = version.major;
			const expectedMinor = version.minor;
			const expectedPatch = version.patch + 1;

			version.incrementPatch();

			expect(version.major).toBe(expectedMajor);
			expect(version.minor).toBe(expectedMinor);
			expect(version.patch).toBe(expectedPatch);
		});
	});

	describe('setPreRelease', () => {
		it('should change the pre-release suffix', () => {
			const version = new Version();
			const expected = faker.datatype.string();

			version.setPreRelease(expected);

			expect(version.preRelease).toBe(expected);
		});

		it('should throw an error if the pre-release is not alphanumeric values separated by dots', () => {
			const version = new Version();
			const preRelease = '!!!!!!';

			expect(() => version.setPreRelease(preRelease)).toThrowError(
				'The pre-release suffix must be alphanumeric values separated by dots!'
			);
		});
	});

	describe('setBuild', () => {
		it('should change the build suffix', () => {
			const version = new Version();
			const expected = faker.datatype.string();

			version.setBuild(expected);

			expect(version.build).toBe(expected);
		});

		it('should throw an error if the build is not alphanumeric values separated by dots', () => {
			const version = new Version();
			const build = '!!!!!!';

			expect(() => version.setBuild(build)).toThrowError(
				'The build suffix must be alphanumeric values separated by dots!'
			);
		});
	});

	describe('toString', () => {
		it('should append major, minor and patch numbers with dots', () => {
			const version = new Version();
			const expected = `${version.major}.${version.minor}.${version.patch}`;

			expect(version.toString()).toBe(expected);
		});

		it('should append pre-release with a dash after the major, minor and patch numbers', () => {
			const version = new Version();
			const preRelease = 'alpha';
			const expected = `${version.major}.${version.minor}.${version.patch}-${preRelease}`;

			version.setPreRelease(preRelease);

			expect(version.toString()).toBe(expected);
		});

		it('should append build with a plus after the major, minor and patch numbers', () => {
			const version = new Version();
			const build = '001';
			const expected = `${version.major}.${version.minor}.${version.patch}+${build}`;

			version.setBuild(build);

			expect(version.toString()).toBe(expected);
		});

		it('should append build with a plus after the major, minor, patch numbers and the pre-release suffix', () => {
			const version = new Version();
			const preRelease = 'alpha';
			const build = '001';
			const expected = `${version.major}.${version.minor}.${version.patch}-${preRelease}+${build}`;

			version.setPreRelease(preRelease);
			version.setBuild(build);

			expect(version.toString()).toBe(expected);
		});
	});

	describe('fromString', () => {
		it('should instanciate a version when the string value is formatted correctly', () => {
			const version = '1.2.5-alpha.beta+001.987';
			const expected = new Version(1, 2, 5, 'alpha.beta', '001.987');

			const actual = Version.fromString(version);

			expect(actual).toMatchObject(expected);
		});
	});
});
