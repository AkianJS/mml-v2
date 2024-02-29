<script lang="ts">
	import type { MovieI } from '$lib/interfaces/movie.interface';
	import MovieCard from '../movie-card/MovieCard.svelte';
	import { getMovies } from '$lib/utils/movies-fetch';
	import MovieDetail from '../movie-detail/MovieDetail.svelte';
	import InfiniteScroll from '../infinite-scroll/InfiniteScroll.svelte';

	export let data: MovieI;
	export let title: string;
	export let infiniteScroll = true;

	let hasMore = data.page < data.total_pages;

	const loadMore = () => {
		let pageNumber = ++data.page;

		getMovies('discover/movie', `page=${pageNumber}`).then((newMovies: MovieI) => {
			data.page = newMovies.page;
			data.total_pages = newMovies.total_pages;

			for (let movie of newMovies.results) {
				getMovies(`movie/${movie.id}`).then((movieDetails: MovieDetail) => {
					movie.genres = movieDetails.genres;
					movie.runtime = movieDetails.runtime;
					data.results = [...data.results, movie];
				});
			}
		});
	};
</script>

<h1 class="mb-8 text-3xl font-bold italic">{title}</h1>
<section class="grid gap-4">
	{#each data.results as movie}
		<MovieCard {movie} />
	{/each}
</section>

{#if infiniteScroll}
	<InfiniteScroll {hasMore} loadFunction={loadMore} />
{/if}

<style lang="postcss">
	section {
		grid-template-columns: repeat(auto-fit, 250px);
		justify-content: space-between;
	}
</style>
