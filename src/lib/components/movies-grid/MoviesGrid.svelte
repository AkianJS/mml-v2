<script lang="ts">
	import type { MovieI } from '$lib/interfaces/movie.interface';
	import InfiniteScroll from '../infinite-scroll/InfiniteScroll.svelte';
	import MovieCard from '../movie-card/MovieCard.svelte';

	export let data: MovieI;
	export let title: string;
	export let infiniteScroll = true;
	export let loadMore: () => void;
	export let hasMore: boolean;
</script>

<h1 class="mb-8 text-3xl font-bold italic">{title}</h1>
<section class="grid gap-4">
	{#each data.results as movie, i}
		<MovieCard id={i} {movie} />
	{/each}
</section>

{#if infiniteScroll && hasMore}
	<InfiniteScroll {hasMore} loadFunction={loadMore} />
{/if}

<style lang="postcss">
	section {
		grid-template-columns: repeat(auto-fit, 250px);
		justify-content: space-between;
	}
</style>
