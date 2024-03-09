<script lang="ts">
	import Carousel from '$lib/components/carousel/Carousel.svelte';
	import MoviesGrid from '$lib/components/movies-grid/MoviesGrid.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const hasMore = false;
	const loadMore = () => {
		return;
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Discover new movies." />
</svelte:head>

<div class="mt-8">
	<MoviesGrid {hasMore} {loadMore} infiniteScroll={false} data={data.data} title="Discover" />
</div>

<section class="h-96 w-full py-8">
	<h2 class="mb-4 text-3xl font-bold italic">Titles you can't miss</h2>
	<Carousel
		items={data.rest.map((movie) => {
			return {
				src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
				name: movie.title
			};
		})}
	/>
</section>
