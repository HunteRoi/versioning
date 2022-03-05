import { IVersionManager, Type } from 'IVersionManager';
import { IVersion } from 'IVersion';

/**
 * A wrapper of a {@link Version} instance to properly update it.
 *
 * @export
 * @implements {IVersionManager}
 */
export class VersionManager implements IVersionManager {
	private readonly _version: IVersion;

	constructor(version: IVersion) {
		if (!version) throw new Error("The 'version' parameter is mandatory!");
		this._version = version;
	}

	update(type: Type, preRelease?: string, build?: string): void {
		if (type === 'major') this._version.incrementMajor();
		if (type === 'minor') this._version.incrementMinor();
		if (type === 'patch') this._version.incrementPatch();
	}
}
