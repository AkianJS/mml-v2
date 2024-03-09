<script lang="ts">
	import MoviesGrid from '$lib/components/movies-grid/MoviesGrid.svelte';
	import { removeDuplicatesByKey } from '$lib/utils/library';
	import { getMoviesWithExtraInfo } from '$lib/utils/movies-fetch';
	import type { PageData } from './$types';

	export let data: PageData;
	let hasMore = data.page < data.total_pages;

	const loadMore = async () => {
		let pageNumber = ++data.page;

		const movies = await getMoviesWithExtraInfo({
			url: 'trending/movie/week',
			params: `page=${pageNumber}`,
			fetch
		});
		data.page = movies.page;
		data.total_pages = movies.total_pages;
		const allTheMovies = [...data.results, ...movies.results];
		data.results = removeDuplicatesByKey(allTheMovies, 'id');
		hasMore = pageNumber < data.total_pages;
	};
</script>

<div class="mt-8">
	<MoviesGrid title="Trend on this week" {loadMore} {hasMore} {data} />
</div>
