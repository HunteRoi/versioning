import { IVersion } from './IVersion';

export class Version implements IVersion {
	major: number;
	minor: number;
	patch: number;
	preRelease: string;
	build: string;

	constructor(
		major: number = 1,
		minor: number = 0,
		patch: number = 0,
		preRelease: string = null,
		build: string = null
	) {
		this.major = major;
		this.minor = minor;
		this.patch = patch;
		this.preRelease = preRelease;
		this.build = build;
	}

	incrementMajor(): void {
		this.major++;
		this.minor = 0;
		this.patch = 0;
	}

	incrementMinor(): void {
		this.minor++;
		this.patch = 0;
	}

	incrementPatch(): void {
		this.patch++;
	}

	setPreRelease(preRelease: string): void {
		if (!preRelease.match(/\w+(\.\w+)*/i))
			throw new Error(
				'The pre-release suffix must be alphanumeric values separated by dots!'
			);
		this.preRelease = preRelease;
	}

	setBuild(build: string): void {
		if (!build.match(/\w+(\.\w+)*/i))
			throw new Error(
				'The build suffix must be alphanumeric values separated by dots!'
			);
		this.build = build;
	}

	toString(): string {
		let version = `${this.major}.${this.minor}.${this.patch}`;

		if (this.preRelease) version += `-${this.preRelease}`;
		if (this.build) version += `+${this.build}`;

		return version;
	}

	static fromString(version: string): Version {
		const [_, major, minor, patch, preRelease, build] = [
			...version.matchAll(
				/(\d+)\.(\d+)\.(\d+)(?:-(\w+(?:\.\w+)*))?(?:\+(\w+(?:\.\w+)*))?/g
			),
		][0];

		return new Version(
			Number(major),
			Number(minor),
			Number(patch),
			preRelease,
			build
		);
	}
}
