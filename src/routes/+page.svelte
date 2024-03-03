<script lang="ts">
	import { goto } from '$app/navigation';
	import Chip from '$lib/components/chip/Chip.svelte';
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

	const pushParams = (genreId: number) => {
		const url = new URL(window.location.href);
		url.searchParams.set('genre', genreId.toString());
		goto(url);
	};
</script>

<section class="mb-4 flex flex-wrap gap-4">
	{#if genres}
		{#each genres.genres as genre}
			<Chip chip={{ label: genre.name, action: () => pushParams(genre.id), icon: '' }} />
		{/each}
	{/if}
</section>

<MoviesGrid {hasMore} {loadMore} infiniteScroll={false} {data} title="Discover" />
