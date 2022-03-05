import { Type, Version, VersionManager } from '../src';

describe('VersionManager', () => {
	it('should throw an error if the version parameter is null or undefined', () => {
		expect(() => new VersionManager(null)).toThrowError(
			"The 'version' parameter is mandatory!"
		);
	});

	it('should instanciate properly', () => {
		const version = new Version();
		expect(() => new VersionManager(version)).not.toBeNull();
	});

	describe('update', () => {
		it('should update the version\'s major number based on the type "major"', () => {
			const type: Type = 'major';
			const version = new Version();
			const versionManager = new VersionManager(version);
			const expected = version.major + 1;

			versionManager.update(type);

			expect(version.major).toBe(expected);
			expect(version.minor).toBe(0);
			expect(version.patch).toBe(0);
		});

		it('should update the version\'s minor number based on the type "minor"', () => {
			const type: Type = 'minor';
			const version = new Version();
			const versionManager = new VersionManager(version);
			const expected = version.minor + 1;
			const currentMajor = version.major;

			versionManager.update(type);

			expect(version.major).toBe(currentMajor);
			expect(version.minor).toBe(expected);
			expect(version.patch).toBe(0);
		});
	});
});
