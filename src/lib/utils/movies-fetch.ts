import { PUBLIC_API_KEY } from '$env/static/public';
import type { MovieI } from '$lib/interfaces/movie.interface';
import { BASE_URL } from './const';

type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
interface FetchParams {
	url: string;
	params?: string;
	fetch: Fetch;
}

export async function getMovies({ url = '', params = '', fetch }: FetchParams) {
	const response = await fetch(`${BASE_URL}/${url}?api_key=${PUBLIC_API_KEY}&${params}`);
	return await response.json();
}

export async function getMoviesWithExtraInfo({ url = '', params = '', fetch }: FetchParams) {
	const response: MovieI = await getMovies({ url, params, fetch });
	if (response.results)
		for (const movie of response.results) {
			const extraInfo = await getMovies({ url: `movie/${movie.id}`, fetch });
			movie.runtime = extraInfo.runtime;
			movie.genres = extraInfo.genres;
			movie.poster_path = extraInfo.poster_path;
		}
	return response;
}
