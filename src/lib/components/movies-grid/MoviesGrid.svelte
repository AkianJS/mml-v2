<script lang="ts">
	import type { MovieI } from '$lib/interfaces/movie.interface';
	import MovieCard from '../movie-card/MovieCard.svelte';
	import InfiniteScroll from '../infinite-scroll/InfiniteScroll.svelte';

	export let data: MovieI;
	export let title: string;
	export let infiniteScroll = true;
	export let loadMore: () => void;
	export let hasMore: boolean;
</script>

<h1 class="mb-8 text-3xl font-bold italic">{title}</h1>
<section class="grid gap-4">
	{#each data.results as movie}
		<MovieCard {movie} />
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
