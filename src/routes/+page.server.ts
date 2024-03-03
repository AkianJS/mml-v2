import type { MovieDetail, MovieI } from '$lib/interfaces/movie.interface';
import { getUrlParams } from '$lib/utils/library';
import { getMovies } from '$lib/utils/movies-fetch';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad<MovieI> = (async ({ url, fetch }) => {
	const parameters = getUrlParams(url);

	const data: MovieI = await getMovies({
		url: 'discover/movie',
		params: parameters,
		fetch
	});

	data.results.splice(0, 10);

	for (const movie of data.results) {
		const detailData: MovieDetail = await getMovies({
			url: `movie/${movie.id}`,
			params: 'language=en-US',
			fetch
		});
		movie.runtime = detailData.runtime;
		movie.genres = detailData.genres;
		movie.poster = detailData.poster_path;
	}

	if (data) return data;

	throw error(404, 'Failed to load data');
}) satisfies PageServerLoad<MovieI>;
