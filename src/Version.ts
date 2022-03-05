import { IVersion } from './IVersion';

export class Version implements IVersion {
	major: number;
	minor: number;
	patch: number;

	constructor() {
		this.major = 1;
		this.minor = 0;
		this.patch = 0;
	}

	incrementMajor() {
		this.major++;
		this.minor = 0;
		this.patch = 0;
	}
}
