import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { MovieI } from '$lib/interfaces/movie.interface';


const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY =
	'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzUzN2ZmMTlmMzgxZGQ3YjY3ZWVlMWVhOGI4MTY0YSIsInN1YiI6IjVlM2ExNmU1MGMyNzEwMDAxODc1NTI4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOpZ_nBtA93tbzr6-rxD0760tssAAaSppyjRv9anArs';

export const load: PageServerLoad<MovieI> = async () => {
	const response = await fetch(`${BASE_URL}discover/movie`, {
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			'Content-Type': 'application/json;charset=utf-8'
		}
	});
	const data = await response.json();
    
	if (data)
		return data;

	throw error(404, 'Failed to load data');
};
