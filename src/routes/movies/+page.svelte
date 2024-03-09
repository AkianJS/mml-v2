<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Chip from '$lib/components/chip/Chip.svelte';
	import Filter from '$lib/components/filter/Filter.svelte';
	import MoviesGrid from '$lib/components/movies-grid/MoviesGrid.svelte';
	import type { Genre } from '$lib/interfaces/movie.interface';
	import { filter } from '$lib/store/filter.store';
	import { getUrlParams, removeDuplicatesByKey } from '$lib/utils/library';
	import { getMovies, getMoviesWithExtraInfo } from '$lib/utils/movies-fetch';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let hasMore = data.page < data.total_pages;
	let genres: {
		genres: Genre[];
	};
	let selectedGenre = 0;

	onMount(async () => {
		genres = await getMovies({ url: 'genre/movie/list', fetch });
		genres.genres.unshift({ id: 0, name: 'All' });
		const searchParams = $page.url.searchParams;

		const isSearchActive = searchParams.get('search');

		if (isSearchActive) return (selectedGenre = 0);

		const isGenreActive = searchParams.get('genre');

		if (isGenreActive) filter.set({ ...$filter, genre: parseInt(isGenreActive) });

		if ($filter.genre) {
			selectedGenre = $filter.genre;
		}
	});

	const pushGenreParams = (genreId: number) => {
		const url = new URL(window.location.href);
		url.searchParams.set('genre', genreId.toString());
		url.searchParams.delete('search');
		filter.set({ ...$filter, genre: genreId });
		goto(url);
		selectedGenre = genreId;
	};

	const loadMore = async () => {
		let pageNumber = ++data.page;
		const url = $page.url;
		const filters = getUrlParams(url);

		const movies = await getMoviesWithExtraInfo({
			url: 'discover/movie',
			params: `page=${pageNumber}&vote_count.gte=50&vote_count.lte=10000000&${filters}`,
			fetch
		});
		data.page = movies.page;
		data.total_pages = movies.total_pages;
		const allTheMovies = [...data.results, ...movies.results];
		data.results = removeDuplicatesByKey(allTheMovies, 'id');
		hasMore = pageNumber < data.total_pages;
	};

	filter.subscribe((value) => {
		console.log(value);
		if (!value.genre) selectedGenre = 0;
	});
</script>

<section class="mb-4 mt-8 flex flex-wrap gap-4">
	{#if genres}
		{#each genres.genres as genre}
			<Chip
				active={selectedGenre === genre.id}
				chip={{ label: genre.name, action: () => pushGenreParams(genre.id), icon: '' }}
			/>
		{/each}
	{/if}
</section>
<div class="my-4 flex justify-end">
	<Filter />
</div>
<MoviesGrid title="All the movies" {loadMore} {hasMore} {data} />
