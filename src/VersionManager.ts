import { IVersionManager, Type } from 'IVersionManager';
import { IVersion } from 'IVersion';

/**
 * A wrapper of a {@link Version} instance to properly update it.
 *
 * @export
 * @implements {IVersionManager}
 */
export class VersionManager implements IVersionManager {
	constructor(version: IVersion) {
		if (!version) throw new Error("The 'version' parameter is mandatory!");
	}

	update(type: Type, preRelease: string = null, build: string = null): void {
		throw new Error('Method not implemented.');
	}
}
