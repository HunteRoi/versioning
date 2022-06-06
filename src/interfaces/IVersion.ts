import { UpdateType } from 'UpdateType';

/**
 * A contract class that follows [Semantic Versioning](https://semver.org) standards to manage your project's version.
 *
 * @export
 */
export interface IVersion {
  /**
   * Increments the major number by one, and sets the minor and patch numbers to 0.
   */
  incrementMajor(): void;

  /**
   * Increments the minor number by one, sets the patch number to 0 and does not update the major number.
   */
  incrementMinor(): void;

  /**
   * Increments the patch number by one, and does not update the major and minor numbers.
   */
  incrementPatch(): void;

  /**
   * Sets the pre-release suffix at the end of the version.
   *
   *
   * @param preRelease the pre-release suffix to add
   */
  setPreRelease(preRelease: string): void;

  /**
   * Removes the pre-release suffix from the end of the version.
   */
  resetPreRelease(): void;

  /**
   * Sets the build suffix at the end of the version.
   *
   * @param build the build suffix to add
   */
  setBuild(build: string): void;

  /**
   * Removes the build suffix from the end of the version.
   */
  resetBuild(): void;

  /**
   * Outputs the version in the [SemVer](https://semver.org) format: `<major>.<minor>.<patch>` with optional pre-release (`-<pre-release>`) and build (`+<build>`) suffixes.
   */
  toString(): string;

  /**
   * Stringifies the version when `JSON.parse` is called.
   */
  toJSON(): string;

  /**
   * Updates the version properly.
   *
   * @param type the type of the update
   * @param preRelease the value of the pre-release (optional)
   * @param build the value of the build (optional)
   */
  update(
    type: UpdateType,
    preRelease?: string | null,
    build?: string | null
  ): void;
}
