export interface IVersion {
	incrementMajor(): void;
	incrementMinor(): void;
	incrementPatch(): void;
	setPreRelease(preRelease: string): void;
	setBuild(build: string): void;
	toString(): string;
}
