export const BASE_URL = 'https://api.themoviedb.org/3';

export const PARAM_PARSER: Record<string, string> = {
	genre: 'with_genres',
	search: 'query',
	year: 'primary_release_year',
	top: 'sort_by',
	adult: 'include_adult'
};
