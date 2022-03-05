import { IVersion } from './IVersion';

export class Version implements IVersion {
	private _major: number;
	private _minor: number;
	private _patch: number;

	constructor() {
		this._major = 1;
		this._minor = 0;
		this._patch = 0;
	}
}
