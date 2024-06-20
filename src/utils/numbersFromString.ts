export function getNumbersFromString(str: string) {
	return str.split(',').map(Number);
}
