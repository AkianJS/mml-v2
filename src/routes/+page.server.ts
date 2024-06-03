import type { MovieDetail, MovieI, VideosType } from '$lib/interfaces/movie.interface';
import { getMovies } from '$lib/utils/movies-fetch';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = (async ({ fetch }) => {
	const data: MovieI = await getMovies({
		url: 'discover/movie',
		params: 'year=2024',
		fetch
	});

	const rest = data.results.splice(0, 10);

	for (const movie of rest) {
		const detailData: VideosType = await getMovies({
			url: `movie/${movie.id}/videos`,
			fetch
		});
		movie.trailer = detailData.results.filter((video) => video.type === 'Trailer')[0]?.key;
	}

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

	if (data)
		return {
			data,
			rest
		};

	throw error(404, 'Failed to load data');
}) satisfies PageServerLoad;
