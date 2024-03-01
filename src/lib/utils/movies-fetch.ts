import { PUBLIC_API_KEY } from '$env/static/public';
import type { MovieI } from '$lib/interfaces/movie.interface';
import { BASE_URL } from './const';

export async function getMovies(url = '', params = '') {
	const response = await fetch(`${BASE_URL}/${url}?api_key=${PUBLIC_API_KEY}&${params}`);
	return await response.json();
}

export async function getMoviesWithExtraInfo(url = '', params = '') {
	const response: MovieI = await getMovies(url, params);
	for (const movie of response.results) {
		const extraInfo = await getMovies(`movie/${movie.id}`);
		movie.runtime = extraInfo.runtime;
		movie.genres = extraInfo.genres;
	}
	return response;
}
