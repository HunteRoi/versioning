import { VersionManager } from '../src';

describe('VersionManager', () => {
	it('should throw an error if the version parameter is null or undefined', () => {
		expect(() => new VersionManager(null)).toThrowError(
			"The 'version' parameter is mandatory!"
		);
	});
});
