<script lang="ts">
	import MoviesGrid from '$lib/components/movies-grid/MoviesGrid.svelte';
	import type { Genre } from '$lib/interfaces/movie.interface';
	import { getMovies } from '$lib/utils/movies-fetch';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const hasMore = false;
	const loadMore = () => {
		return;
	};

	let genres: {
		genres: Genre[];
	};

	onMount(async () => {
		genres = await getMovies({ url: 'genre/movie/list', fetch });
	});
</script>

<MoviesGrid {hasMore} {loadMore} infiniteScroll={false} {data} title="Discover" />
