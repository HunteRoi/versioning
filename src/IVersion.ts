export interface IVersion {
	incrementMajor(): void;
	incrementMinor(): void;
	incrementPatch(): void;
	setPreRelease(preRelease: string): void;
	resetPreRelease(): void;
	setBuild(build: string): void;
	resetBuild(): void;
	toString(): string;
}
