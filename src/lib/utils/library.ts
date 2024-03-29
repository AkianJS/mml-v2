//  Create a function to remove from array of objects based on a key

import { filter, type FilterI } from '$lib/store/filter.store';
import { PARAM_KEY_PARSER } from './const';

export function removeDuplicatesByKey<T extends Record<string, unknown>>(
	arr: T[],
	key: keyof T
): T[] {
	return arr.filter((item, index, self) => self.findIndex((v) => v[key] === item[key]) === index);
}

export function getUrlParams(url: URL): string {
	let parameters = '';

	url.searchParams.forEach((value, key) => {
		if (key === 'top' && value === 'true') value = `vote_average.desc`;
		if (key === 'adult' && value === 'true') value = 'true';
		if (key === 'genre' && value === '0') value = '';
		parameters += `${PARAM_KEY_PARSER[key]}=${value}&`;
	});

	return parameters;
}

export function getFiltersFromStore() {
	let filters = '';

	filter.subscribe((value: FilterI) => {
		Object.keys(value).forEach((key: string) => {
			if (key in value && value[key as keyof FilterI] !== undefined) {
				filters += `${key}=${value[key as keyof FilterI]}&`;
			}
		});
	});

	return filters;
}
