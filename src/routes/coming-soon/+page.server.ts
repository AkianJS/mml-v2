import type { MovieI } from '$lib/interfaces/movie.interface';
import { getMoviesWithExtraInfo } from '$lib/utils/movies-fetch';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<MovieI> = (async () => {
	const data: MovieI = await getMoviesWithExtraInfo('movie/upcoming');

	if (data) return data;

	throw error(404, 'Failed to load data');
}) satisfies PageServerLoad<MovieI>;
