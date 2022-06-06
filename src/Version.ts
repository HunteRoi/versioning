import { IVersion } from './interfaces';
import { UpdateType } from './UpdateType';
import { UpdateTypes } from './UpdatesTypes';

const alphanumericValuesSeparatedByDots = /\w+(\.\w+)*/i;
const defaultIndexValue = 0;

/**
 * A simple utility class wrapping up some methods to manage your project's version from within the code.
 *
 * @export
 * @implements {IVersion}
 */
export class Version implements IVersion {
  #major: number;
  #minor: number;
  #patch: number;
  #preRelease: string;
  #build: string;

  /**
   * Creates an instance of {@link Version}.
   * @param major [default=1]
   * @param minor [default=0]
   * @param patch [default=0]
   * @param preRelease [default=null]
   * @param build [default=null]
   */
  constructor(
    major: number = 1,
    minor: number = 0,
    patch: number = 0,
    preRelease: string = null,
    build: string = null
  ) {
    this.#major = major;
    this.#minor = minor;
    this.#patch = patch;
    this.#preRelease = preRelease;
    this.#build = build;

    Object.defineProperty(this, "major", { get: () => this.#major, enumerable: true });
    Object.defineProperty(this, "minor", { get: () => this.#minor, enumerable: true });
    Object.defineProperty(this, "patch", { get: () => this.#patch, enumerable: true });
    Object.defineProperty(this, "preRelease", { get: () => this.#preRelease, enumerable: true });
    Object.defineProperty(this, "build", { get: () => this.#build, enumerable: true });
  }

  /**
   * Gets the [major] value.
   *
   * @readonly
   */
  get major() {
    return this.#major;
  }

  /**
   * Gets the [minor] value.
   *
   * @readonly
   */
  get minor() {
    return this.#minor;
  }

  /**
   * Gets the [patch] value.
   *
   * @readonly
   */
  get patch() {
    return this.#patch;
  }

  /**
   * Gets the [pre-release] value.
   *
   * @readonly
   */
  get preRelease() {
    return this.#preRelease;
  }

  /**
   * Gets the [build] value.
   *
   * @readonly
   */
  get build() {
    return this.#build;
  }

  /** @inheritdoc */
  incrementMajor(): void {
    this.#major++;
    this.#minor = defaultIndexValue;
    this.#patch = defaultIndexValue;
  }

  /** @inheritdoc */
  incrementMinor(): void {
    this.#minor++;
    this.#patch = defaultIndexValue;
  }

  /** @inheritdoc */
  incrementPatch(): void {
    this.#patch++;
  }

  /**
   * @inheritdoc
   * @throws The pre-release suffix must be alphanumeric values separated by dots!
   */
  setPreRelease(preRelease: string): void {
    if (!preRelease.match(alphanumericValuesSeparatedByDots))
      throw new Error(
        'The pre-release suffix must be alphanumeric values separated by dots!'
      );
    this.#preRelease = preRelease;
  }

  /** @inheritdoc */
  resetPreRelease(): void {
    this.#preRelease = null;
  }

  /**
   * @inheritdoc
   * @throws The build suffix must be alphanumeric values separated by dots!
   */
  setBuild(build: string): void {
    if (!build.match(alphanumericValuesSeparatedByDots))
      throw new Error(
        'The build suffix must be alphanumeric values separated by dots!'
      );
    this.#build = build;
  }

  /** @inheritdoc */
  resetBuild(): void {
    this.#build = null;
  }

  /** @inheritdoc */
  toString(): string {
    let version = `${this.#major}.${this.#minor}.${this.#patch}`;

    if (this.#preRelease) version += `-${this.#preRelease}`;
    if (this.#build) version += `+${this.#build}`;

    return version;
  }

  /**
   * Parses a string to detect if it fits in the [Semantic Versioning](https://semver.org) format.
   *
   * @param version the version as a string in the [SemVer](https://semver.org) format.
   * @returns an instance of {@link Version} based on the input
   * @throws The value [version] does not follow the semantic versioning format: `<major>.<minor>.<patch>-<pre-release>+<build>` where pre-release and build are optional.
   */
  static fromString(version: string): Version {
    const regexp =
      /^(\d+)\.(\d+)\.(\d+)(?:-(\w+(?:\.\w+)*))?(?:\+(\w+(?:\.\w+)*))?$/g;
    const match = [...version.matchAll(regexp)];

    if (match.length === 0) {
      throw new Error(
        `The value ${version} does not follow the semantic versioning format: "\<major\>.\<minor\>.\<patch\>-\<pre-release\>+\<build\>" where pre-release and build are optional.`
      );
    }

    const [_, major, minor, patch, preRelease, build] = [...match][0];

    return new Version(
      Number(major),
      Number(minor),
      Number(patch),
      preRelease,
      build
    );
  }

  /** @inheritdoc */
  toJSON(): string {
    return this.toString();
  }

  /**
   * Revives an instance of {@link Version} when it has been stringified via `JSON.stringify`.
   *
   * @param key the property (should be null or undefined)
   * @param value the value for this property (should be the version as a string)
   * @returns the newly created instance of {@link Version}
   */
  static fromJSON(key: string | null | undefined, value: string): Version {
    return Version.fromString(value);
  }

  /** @inheritdoc */
  update(type: UpdateType, preRelease?: string, build?: string): void {
    switch (type) {
      case UpdateTypes.MAJOR:
        this.incrementMajor();
        break;
      case UpdateTypes.MINOR:
        this.incrementMinor();
        break;
      case UpdateTypes.PATCH:
        this.incrementPatch();
        break;
    }

    if (preRelease) {
      this.setPreRelease(preRelease);
    } else {
      this.resetPreRelease();
    }

    if (build) {
      this.setBuild(build);
    } else {
      this.resetBuild();
    }
  }
}
