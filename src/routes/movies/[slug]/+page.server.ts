import { error } from '@sveltejs/kit';
import { getMovies } from '$lib/utils/movies-fetch';
import type { ImageInterface } from '$lib/interfaces/images.interface';
import type { MovieDetail } from '$lib/interfaces/movie.interface';
import type { PageServerLoad } from './$types';
import type { MovieI } from '$lib/interfaces/movie.interface';

type VideosType = {
	results: {
		type: string;
		site: string;
		key: string;
	}[];
};

export const load: PageServerLoad = (async ({ params }) => {
	let movie: MovieDetail = await getMovies(`movie/${params.slug}, 'language=en-US`);

	if (movie.overview === '') {
		movie = await getMovies(`movie/${params.slug}`);
	}

	const images: ImageInterface = await getMovies(`movie/${params.slug}/images`);

	const videos: VideosType = await getMovies(`movie/${params.slug}/videos`);

	const recommendations: MovieI = await getMovies(`movie/${params.slug}/recommendations`);

	for (const movie of recommendations.results) {
		const detailData: MovieDetail = await getMovies(`movie/${movie.id}`, 'language=en-US');
		movie.runtime = detailData.runtime;
		movie.genres = detailData.genres;
	}

	if (movie) {
		return {
			movie,
			images,
			videos,
			recommendations
		};
	} else {
		throw error(404, 'No se puede encontrar la página');
	}
}) satisfies PageServerLoad;
