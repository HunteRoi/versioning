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
		});
	});
});
