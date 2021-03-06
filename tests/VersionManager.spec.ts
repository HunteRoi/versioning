import { faker } from '@faker-js/faker';

import { UpdateType, Version, VersionManager } from '../src';

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
      const type: UpdateType = 'major';
      const version = new Version();
      const versionManager = new VersionManager(version);
      const expected = version.major + 1;

      versionManager.update(type);

      expect(version.major).toBe(expected);
      expect(version.minor).toBe(0);
      expect(version.patch).toBe(0);
    });

    it('should update the version\'s minor number based on the type "minor"', () => {
      const type: UpdateType = 'minor';
      const version = new Version();
      const versionManager = new VersionManager(version);
      const expected = version.minor + 1;
      const currentMajor = version.major;

      versionManager.update(type);

      expect(version.major).toBe(currentMajor);
      expect(version.minor).toBe(expected);
      expect(version.patch).toBe(0);
    });

    it('should update the version\'s patch number based on the type "patch"', () => {
      const type: UpdateType = 'patch';
      const version = new Version();
      const versionManager = new VersionManager(version);
      const expected = version.patch + 1;
      const currentMajor = version.major;
      const currentMinor = version.minor;

      versionManager.update(type);

      expect(version.major).toBe(currentMajor);
      expect(version.minor).toBe(currentMinor);
      expect(version.patch).toBe(expected);
    });

    it('should update the pre-release value based on the preRelease parameter', () => {
      const type: UpdateType = 'major';
      const version = new Version();
      const versionManager = new VersionManager(version);
      const expected = faker.datatype.string();

      versionManager.update(type, expected);

      expect(version.preRelease).toBe(expected);
    });

    it('should reset the pre-release when the preRelease parameter is not provided', () => {
      const type: UpdateType = 'major';
      const version = new Version();
      const versionManager = new VersionManager(version);
      version.setPreRelease('alpha');
      expect(version.preRelease).not.toBeNull();

      versionManager.update(type);

      expect(version.preRelease).toBeNull();
    });

    it('should update the build value based on the build parameter', () => {
      const type: UpdateType = 'major';
      const version = new Version();
      const versionManager = new VersionManager(version);
      const expected = faker.datatype.string();

      versionManager.update(type, null, expected);

      expect(version.build).toBe(expected);
    });

    it('should reset the build when the build parameter is not provided', () => {
      const type: UpdateType = 'major';
      const version = new Version();
      const versionManager = new VersionManager(version);
      version.setBuild('001');
      expect(version.build).not.toBeNull();

      versionManager.update(type);

      expect(version.build).toBeNull();
    });
  });
});
