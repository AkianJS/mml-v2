<script lang="ts">
	import { page } from '$app/stores';
	import Filter from '$lib/components/filter/Filter.svelte';
	import MoviesGrid from '$lib/components/movies-grid/MoviesGrid.svelte';
	import { getUrlParams, removeDuplicatesByKey } from '$lib/utils/library';
	import { getMoviesWithExtraInfo } from '$lib/utils/movies-fetch';
	import type { PageData } from './$types';

	export let data: PageData;

	let hasMore = data.page < data.total_pages;

	const loadMore = async () => {
		let pageNumber = ++data.page;
		const url = $page.url;
		const filters = getUrlParams(url);

		const movies = await getMoviesWithExtraInfo({
			url: filters.includes('query') ? 'search/movie' : 'discover/movie',
			params: `page=${pageNumber}&vote_count.gte=50&vote_count.lte=10000000&${filters}`,
			fetch
		});
		data.page = movies.page;
		data.total_pages = movies.total_pages;
		const allTheMovies = [...data.results, ...movies.results];
		data.results = removeDuplicatesByKey(allTheMovies, 'id');
		hasMore = pageNumber < data.total_pages;
	};
</script>

<Filter />
<MoviesGrid title="All the movies" {loadMore} {hasMore} {data} />
