import type { MovieI } from '$lib/interfaces/movie.interface';
import { getUrlParams } from '$lib/utils/library';
import { getMoviesWithExtraInfo } from '$lib/utils/movies-fetch';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad<MovieI> = (async ({ url, fetch }) => {
	const search = url.searchParams.get('search');

	if (search) {
		const data: MovieI = await getMoviesWithExtraInfo({
			url: 'search/movie',
			params: `query=${search}`,
			fetch
		});

		if (data) return data;

		throw error(404, 'Failed to load data');
	} else {
		const params = getUrlParams(url);
		const data: MovieI = await getMoviesWithExtraInfo({ url: 'discover/movie', params, fetch });

		if (data) return data;

		throw error(404, 'Failed to load data');
	}
}) satisfies PageServerLoad<MovieI>;
