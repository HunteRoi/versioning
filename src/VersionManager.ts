import { IVersion, IVersionManager } from './interfaces';
import { UpdateType } from './UpdateType';

/**
 * A wrapper of a {@link Version} instance to properly update it.
 *
 * @export
 * @implements {IVersionManager}
 * @deprecated
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
  constructor(version: IVersion | null) {
    if (!version) throw new Error("The 'version' parameter is mandatory!");
    this._version = version;
  }

  /** @inheritdoc
   * @deprecated Use {@link IVersion.update} instead.
   */
  update(
    type: UpdateType,
    preRelease?: string | null,
    build?: string | null
  ): void {
    this._version.update(type, preRelease, build);
  }
}
