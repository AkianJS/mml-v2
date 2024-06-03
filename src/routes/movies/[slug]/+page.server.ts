import type { ImageInterface } from '$lib/interfaces/images.interface';
import type { MovieDetail, MovieI, VideosType } from '$lib/interfaces/movie.interface';
import { getMovies } from '$lib/utils/movies-fetch';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
('$lib/interfaces/movie.interface');

export const load: PageServerLoad = (async ({ params, fetch }) => {
	let movie: MovieDetail = await getMovies({
		url: `movie/${params.slug}`,
		params: 'language=en-US',
		fetch
	});

	if (movie.overview === '') {
		movie = await getMovies({ url: `movie/${params.slug}`, fetch });
	}

	const images: ImageInterface = await getMovies({ url: `movie/${params.slug}/images`, fetch });

	const videos: Promise<VideosType> = getMovies({ url: `movie/${params.slug}/videos`, fetch });

	if (movie) {
		return {
			movie,
			images,
			streamed: {
				videos
			},
			recommendations: {
				page: 0,
				total_pages: 2,
				results: []
			} as unknown as MovieI
		};
	} else {
		throw error(404, 'No se puede encontrar la página');
	}
}) satisfies PageServerLoad;
