import { IVersion } from './IVersion';

export class Version implements IVersion {
	major: number;
	minor: number;
	patch: number;
	preRelease: string;
	build: string;

	constructor() {
		this.major = 1;
		this.minor = 0;
		this.patch = 0;
		this.preRelease = null;
		this.build = null;
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
}
