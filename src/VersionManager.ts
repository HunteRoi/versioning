import { IVersionManager, Type } from 'IVersionManager';
import { IVersion } from 'IVersion';

/**
 * A wrapper of a {@link Version} instance to properly update it.
 *
 * @export
 * @implements {IVersionManager}
 */
export class VersionManager implements IVersionManager {
	/**
	 * The managed version.
	 *
	 * @private
	 */
	private readonly _version: IVersion;

	/**
	 * Creates an instance of {@link VersionManager}.
	 * @param version the version to manage
	 */
	constructor(version: IVersion) {
		if (!version) throw new Error("The 'version' parameter is mandatory!");
		this._version = version;
	}

	/** @inheritdoc */
	update(type: Type, preRelease?: string, build?: string): void {
		if (type === 'major') this._version.incrementMajor();
		if (type === 'minor') this._version.incrementMinor();
		if (type === 'patch') this._version.incrementPatch();
		if (preRelease) this._version.setPreRelease(preRelease);
		else this._version.resetPreRelease();
	}
}
