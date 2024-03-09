import { writable } from 'svelte/store';

export interface FilterI {
	top?: string;
	year?: number;
	genre?: number;
	adult?: string;
}
/**
 * @description Initial values for the filter store
 * @property {string} top - Top filter
 * @property {string} year - Year filter
 * @property {number} genre - Genre filter
 * @property {string} adult - Adult filter
 * @default { top: undefined, year: undefined, genre: undefined, adult: undefined }
 */
export const filterInitialValues: FilterI = {
	top: undefined,
	year: undefined,
	genre: undefined,
	adult: undefined
};

/**
 * @description Store to manage the filter
 */
export const filter = writable<FilterI>(filterInitialValues);
