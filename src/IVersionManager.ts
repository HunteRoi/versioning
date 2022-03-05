/**
 * The type of the update.
 */
export type Type = 'major' | 'minor' | 'patch';

/**
 * The contract class to ensure a proper update of a {@link Version} instance.
 *
 * @export
 */
export interface IVersionManager {
	update(type: Type, preRelease?: string, build?: string): void;
}
