import { IVersion } from './IVersion';

const alphanumericValuesSeparatedByDots = /\w+(\.\w+)*/i;

export class Version implements IVersion {
	private _major: number;
	private _minor: number;
	private _patch: number;
	private _preRelease: string;
	private _build: string;

	get major() {
		return this._major;
	}

	get minor() {
		return this._minor;
	}

	get patch() {
		return this._patch;
	}

	get preRelease() {
		return this._preRelease;
	}

	get build() {
		return this._build;
	}

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

	incrementMajor(): void {
		this._major++;
		this._minor = 0;
		this._patch = 0;
	}

	incrementMinor(): void {
		this._minor++;
		this._patch = 0;
	}

	incrementPatch(): void {
		this._patch++;
	}

	setPreRelease(preRelease: string): void {
		if (!preRelease.match(alphanumericValuesSeparatedByDots))
			throw new Error(
				'The pre-release suffix must be alphanumeric values separated by dots!'
			);
		this._preRelease = preRelease;
	}

	resetPreRelease(): void {
		this._preRelease = null;
	}

	setBuild(build: string): void {
		if (!build.match(alphanumericValuesSeparatedByDots))
			throw new Error(
				'The build suffix must be alphanumeric values separated by dots!'
			);
		this._build = build;
	}

	resetBuild(): void {
		this._build = null;
	}

	toString(): string {
		let version = `${this._major}.${this._minor}.${this._patch}`;

		if (this._preRelease) version += `-${this._preRelease}`;
		if (this._build) version += `+${this._build}`;

		return version;
	}

	static fromString(version: string): Version {
		const regexp =
			/^(\d+)\.(\d+)\.(\d+)(?:-(\w+(?:\.\w+)*))?(?:\+(\w+(?:\.\w+)*))?$/g;
		const match = [...version.matchAll(regexp)];

		if (match.length === 0) {
			throw new Error(
				`The value ${version} does not follow the semantic versioning format: "<major>.<minor>.<patch>-<pre-release>+<build>" where pre-release and build are optional.`
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
