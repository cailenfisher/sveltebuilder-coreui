export function throwError(component: string, fn: string, message: string): never {
	throw new Error(`${component}->${fn}: ${message}`);
}

export function logError(component: string, fn: string, message: string): void {
	console.error(`${component}->${fn}: ${message}`);
}
