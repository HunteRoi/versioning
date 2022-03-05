export interface IVersion {
	incrementMajor(): void;
	incrementMinor(): void;
	incrementPatch(): void;
	setPreRelease(preRelease: string): void;
}
