import type { ImageInterface } from '$lib/interfaces/images.interface';
import type { MovieDetail, MovieI } from '$lib/interfaces/movie.interface';
import { getMovies, getMoviesWithExtraInfo } from '$lib/utils/movies-fetch';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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

	const recommendations: MovieI = await getMoviesWithExtraInfo(
		`movie/${params.slug}/recommendations`
	);

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
