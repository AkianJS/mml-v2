import { writable } from 'svelte/store';

export interface FilterI {
	top?: string;
	year?: string;
	genre?: number;
	adult?: string;
}

export const initialValues: FilterI = {
	top: undefined,
	year: undefined,
	genre: undefined,
	adult: undefined
};

export const filter = writable<FilterI>(initialValues);
