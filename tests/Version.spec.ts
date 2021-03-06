import { faker } from '@faker-js/faker';

import { UpdateType, Version } from '../src';

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

  it('should iterate only through enumerable instance getters', () => {
    const version = new Version();
    const expected = [
      ['major', 1],
      ['minor', 0],
      ['patch', 0],
      ['preRelease', null],
      ['build', null],
    ];

    expect(Object.entries(version)).toEqual(expected);
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

  describe('resetPreRelease', () => {
    it('should set the pre-release suffix to null', () => {
      const version = new Version();
      const actual = 'alpha';

      version.setPreRelease(actual);
      expect(version.preRelease).toBe(actual);
      version.resetPreRelease();

      expect(version.preRelease).toBeNull();
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

  describe('resetBuild', () => {
    it('should set the build suffix to null', () => {
      const version = new Version();
      const actual = '001';

      version.setBuild(actual);
      expect(version.build).toBe(actual);
      version.resetBuild();

      expect(version.build).toBeNull();
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

    it('should throw an error if the string value is not correctly formatted', () => {
      const version = 'a+b..5-alpha.beta-alpha';

      expect(() => Version.fromString(version)).toThrowError(
        `The value ${version} does not follow the semantic versioning format: "<major>.<minor>.<patch>-<pre-release>+<build>" where pre-release and build are optional.`
      );
    });
  });

  describe('toJSON', () => {
    it('should call toString', () => {
      const version = new Version();
      const expected = `\"${version.toString()}\"`;

      expect(JSON.stringify(version)).toBe(expected);
    });
  });

  describe('fromJSON', () => {
    it('should call fromString', () => {
      const version = new Version();
      const expected = version;
      const stringifiedVersion = JSON.stringify(version);

      const actual = JSON.parse(stringifiedVersion, Version.fromJSON);

      expect(actual).toMatchObject(expected);
    });
  });

  describe('update', () => {
    it('should update the version\'s major number based on the type "major"', () => {
      const type: UpdateType = 'major';
      const version = new Version();
      const expected = version.major + 1;

      version.update(type);

      expect(version.major).toBe(expected);
      expect(version.minor).toBe(0);
      expect(version.patch).toBe(0);
    });

    it('should update the version\'s minor number based on the type "minor"', () => {
      const type: UpdateType = 'minor';
      const version = new Version();
      const expected = version.minor + 1;
      const currentMajor = version.major;

      version.update(type);

      expect(version.major).toBe(currentMajor);
      expect(version.minor).toBe(expected);
      expect(version.patch).toBe(0);
    });

    it('should update the version\'s patch number based on the type "patch"', () => {
      const type: UpdateType = 'patch';
      const version = new Version();
      const expected = version.patch + 1;
      const currentMajor = version.major;
      const currentMinor = version.minor;

      version.update(type);

      expect(version.major).toBe(currentMajor);
      expect(version.minor).toBe(currentMinor);
      expect(version.patch).toBe(expected);
    });

    it('should update the pre-release value based on the preRelease parameter', () => {
      const type: UpdateType = 'major';
      const version = new Version();
      const expected = faker.datatype.string();

      version.update(type, expected);

      expect(version.preRelease).toBe(expected);
    });

    it('should reset the pre-release when the preRelease parameter is not provided', () => {
      const type: UpdateType = 'major';
      const version = new Version();
      version.setPreRelease('alpha');
      expect(version.preRelease).not.toBeNull();

      version.update(type);

      expect(version.preRelease).toBeNull();
    });

    it('should update the build value based on the build parameter', () => {
      const type: UpdateType = 'major';
      const version = new Version();
      const expected = faker.datatype.string();

      version.update(type, null, expected);

      expect(version.build).toBe(expected);
    });

    it('should reset the build when the build parameter is not provided', () => {
      const type: UpdateType = 'major';
      const version = new Version();
      version.setBuild('001');
      expect(version.build).not.toBeNull();

      version.update(type);

      expect(version.build).toBeNull();
    });
  });

  describe('get major', () => {
    it('should return the major number of the version', () => {
      const expected = 1;
      const version = new Version(expected, 2, 3);

      expect(version.major).toBe(expected);
    });
  });

  describe('get minor', () => {
    it('should return the minor number of the version', () => {
      const expected = 2;
      const version = new Version(1, expected, 3);

      expect(version.minor).toBe(expected);
    });
  });

  describe('get patch', () => {
    it('should return the patch number of the version', () => {
      const expected = 3;
      const version = new Version(1, 2, expected);

      expect(version.patch).toBe(expected);
    });
  });

  describe('get preRelease', () => {
    it('should return the pre-release string of the version', () => {
      const expected = 'alpha';
      const version = new Version(1, 2, 3, expected);

      expect(version.preRelease).toBe(expected);
    });
  });

  describe('get build', () => {
    it('should return the build string of the version', () => {
      const expected = '001';
      const version = new Version(1, 2, 3, null, expected);

      expect(version.build).toBe(expected);
    });
  });
});
