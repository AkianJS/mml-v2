<script lang="ts">
	import MovieDetail from '$lib/components/movie-detail/MovieDetail.svelte';
	import { removeDuplicatesByKey } from '$lib/utils/library';
	import { getMoviesWithExtraInfo } from '$lib/utils/movies-fetch';
	import type { PageData } from './$types';

	export let data: PageData;
	let hasMore = data.recommendations.page < data.recommendations.total_pages;

	const loadMore = async () => {
		const movies = await getMoviesWithExtraInfo({
			url: `movie/${data.movie.id}/recommendations`,
			params: `page=${++data.recommendations.page}`,
			fetch
		});
		data.recommendations.page = movies.page;
		data.recommendations.total_pages = movies.total_pages;
		hasMore = data.recommendations.page < data.recommendations.total_pages;
		if (data.recommendations?.results) {
			const allTheMovies = [...data.recommendations.results, ...movies.results];
			data.recommendations.results = removeDuplicatesByKey(allTheMovies, 'id');
		} else {
			data.recommendations = movies;
		}
	};
</script>

<svelte:head>
	<title>{data.movie.title}</title>
	<meta name="description" content={data.movie.overview} />
</svelte:head>

<div class="fixed bottom-0 left-0 right-0 top-16">
	{#key data.movie.id}
		<MovieDetail {hasMore} {loadMore} {data} />
	{/key}
</div>
