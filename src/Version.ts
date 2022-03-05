import { IVersion } from './IVersion';

const alphanumericValuesSeparatedByDots = /\w+(\.\w+)*/i;

/**
 * A simple utility class wrapping up some methods to manage your project's version from within the code.
 *
 * @export
 * @implements {IVersion}
 */
export class Version implements IVersion {
	private _major: number;
	private _minor: number;
	private _patch: number;
	private _preRelease: string;
	private _build: string;

	/**
	 * Gets the [major] value.
	 *
	 * @readonly
	 */
	get major() {
		return this._major;
	}

	/**
	 * Gets the [minor] value.
	 *
	 * @readonly
	 */
	get minor() {
		return this._minor;
	}

	/**
	 * Gets the [patch] value.
	 *
	 * @readonly
	 */
	get patch() {
		return this._patch;
	}

	/**
	 * Gets the [pre-release] value.
	 *
	 * @readonly
	 */
	get preRelease() {
		return this._preRelease;
	}

	/**
	 * Gets the [build] value.
	 *
	 * @readonly
	 */
	get build() {
		return this._build;
	}

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
		this._major = major;
		this._minor = minor;
		this._patch = patch;
		this._preRelease = preRelease;
		this._build = build;
	}

	/** @inheritdoc */
	incrementMajor(): void {
		this._major++;
		this._minor = 0;
		this._patch = 0;
	}

	/** @inheritdoc */
	incrementMinor(): void {
		this._minor++;
		this._patch = 0;
	}

	/** @inheritdoc */
	incrementPatch(): void {
		this._patch++;
	}

	/**
	 * @inheritdoc
	 * @throws The pre-release suffix must be alphanumeric values separated by dots!
	 * */
	setPreRelease(preRelease: string): void {
		if (!preRelease.match(alphanumericValuesSeparatedByDots))
			throw new Error(
				'The pre-release suffix must be alphanumeric values separated by dots!'
			);
		this._preRelease = preRelease;
	}

	/** @inheritdoc */
	resetPreRelease(): void {
		this._preRelease = null;
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
		this._build = build;
	}

	/** @inheritdoc */
	resetBuild(): void {
		this._build = null;
	}

	/** @inheritdoc */
	toString(): string {
		let version = `${this._major}.${this._minor}.${this._patch}`;

		if (this._preRelease) version += `-${this._preRelease}`;
		if (this._build) version += `+${this._build}`;

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
}
