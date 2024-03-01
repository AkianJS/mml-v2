<script lang="ts">
	import MovieDetail from '$lib/components/movie-detail/MovieDetail.svelte';
	import { removeDuplicatesByKey } from '$lib/utils/library';
	import { getMoviesWithExtraInfo } from '$lib/utils/movies-fetch';
	import type { PageData } from './$types';

	export let data: PageData;

	let hasMore = data.recommendations.page < data.recommendations.total_pages;

	const loadMore = async () => {
		let pageNumber = ++data.recommendations.page;

		const movies = await getMoviesWithExtraInfo(
			`movie/${data.movie.id}/recommendations`,
			`page=${pageNumber}`
		);
		data.recommendations.page = movies.page;
		data.recommendations.total_pages = movies.total_pages;
		const allTheMovies = [...data.recommendations.results, ...movies.results];
		data.recommendations.results = removeDuplicatesByKey(allTheMovies, 'id');
		hasMore = pageNumber < data.recommendations.total_pages;
	};
</script>

<svelte:head>
	<title>{data.movie.title}</title>
	<meta name="description" content={data.movie.overview} />
</svelte:head>

{#key data.movie.id}
	<MovieDetail {hasMore} {loadMore} {data} />
{/key}
