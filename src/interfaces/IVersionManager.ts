import { UpdateType } from '../UpdateType';

/**
 * The contract class to ensure a proper update of a {@link Version} instance.
 *
 * @export
 */
export interface IVersionManager {
  /**
   * Updates the version properly.
   *
   * @param type the type of the update
   * @param preRelease the value of the pre-release (optional)
   * @param build the value of the build (optional)
   */
  update(type: UpdateType, preRelease?: string, build?: string): void;
}
