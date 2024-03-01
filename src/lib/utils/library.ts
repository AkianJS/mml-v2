//  Create a function to remove from array of objects based on a key

export function removeDuplicatesByKey<T extends Record<string, unknown>>(
	arr: T[],
	key: keyof T
): T[] {
	return arr.filter((item, index, self) => self.findIndex((v) => v[key] === item[key]) === index);
}
