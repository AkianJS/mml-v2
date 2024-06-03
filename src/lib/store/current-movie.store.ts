import type { ImageInterface } from '$lib/interfaces/images.interface';
import type { MovieDetail, VideosType } from '$lib/interfaces/movie.interface';
import { writable } from 'svelte/store';

export interface CurrentMovieStore {
	movie: MovieDetail;
	streamed: {
		images: Promise<ImageInterface>;
		videos: Promise<VideosType>;
	};
	opened: boolean;
}
export const currentMovie = writable<CurrentMovieStore | null>(null);
