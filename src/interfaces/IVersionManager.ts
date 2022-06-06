import { UpdateType } from '../UpdateType';

/**
 * The contract class to ensure a proper update of a {@link Version} instance.
 *
 * @export
 * @deprecated
 */
export interface IVersionManager {
  /**
   * Updates the version properly.
   *
   * @param type the type of the update
   * @param preRelease the value of the pre-release (optional)
   * @param build the value of the build (optional)
   * @deprecated Use {@link IVersion.update} instead.
   */
  update(
    type: UpdateType,
    preRelease?: string | null,
    build?: string | null
  ): void;
}
