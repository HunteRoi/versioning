import { IVersion, IVersionManager } from './interfaces';
import { UpdateType } from './UpdateType';

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
  update(type: UpdateType, preRelease?: string, build?: string): void {
    switch (type) {
      case 'major':
        this._version.incrementMajor();
        break;
      case 'minor':
        this._version.incrementMinor();
        break;
      case 'patch':
        this._version.incrementPatch();
        break;
    }

    if (preRelease) {
      this._version.setPreRelease(preRelease);
    } else {
      this._version.resetPreRelease();
    }

    if (build) {
      this._version.setBuild(build);
    } else {
      this._version.resetBuild();
    }
  }
}
