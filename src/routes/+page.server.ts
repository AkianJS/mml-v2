import type { MovieDetail, MovieI } from '$lib/interfaces/movie.interface';
import { getMovies } from '$lib/utils/movies-fetch';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad<MovieI> = (async () => {
	const data: MovieI = await getMovies('discover/movie');

	data.results.splice(0, 10);

	for (const movie of data.results) {
		const detailData: MovieDetail = await getMovies(`movie/${movie.id}`, 'language=en-US');
		movie.runtime = detailData.runtime;
		movie.genres = detailData.genres;
		movie.poster = detailData.poster_path;
	}

	if (data) return data;

	throw error(404, 'Failed to load data');
}) satisfies PageServerLoad<MovieI>;
