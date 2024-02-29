import { PUBLIC_API_KEY } from '$env/static/public';
import { BASE_URL } from './const';

export async function getMovies(url = '', params?: string) {
	const response = await fetch(`${BASE_URL}/${url}?api_key=${PUBLIC_API_KEY}&${params}`);
	return await response.json();
}
