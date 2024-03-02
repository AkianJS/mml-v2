<script lang="ts">
	import placeholder from '$lib/assets/image-placeholder.png';
	import Icon from '@iconify/svelte';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import type { PageData } from '../../../routes/movies/[slug]/$types';
	import MoviesGrid from '../movies-grid/MoviesGrid.svelte';

	export let data: PageData;
	export let loadMore: () => void;
	export let hasMore: boolean;

	let { movie, images, videos } = data;

	const backdropImage =
		images.backdrops.length > 0
			? `https://image.tmdb.org/t/p/original${images.backdrops[0].file_path}`
			: placeholder;
	const posterImage =
		images.posters.length > 0
			? `https://image.tmdb.org/t/p/original${images.posters[0].file_path}`
			: placeholder;

	const trailer = videos.results?.filter((item) => {
		return item.type.toLocaleLowerCase() === 'trailer';
	});

	onMount(() => {
		gsap.from('.movie-details-animation', {
			opacity: 0,
			delay: 0.3,
			y: 100,
			stagger: 0.2,
			duration: 0.5,
			ease: 'circ'
		});
	});
</script>

<section class="min-h-screen w-full">
	<div class="image2-container absolute right-0 top-16 opacity-70">
		<div
			style={`background-image: url(${backdropImage})`}
			class="image-container absolute right-0 top-0 bg-teal-800"
		/>
	</div>
	<main class="relative mb-8 flex flex-wrap gap-6 px-8 max-[1080px]:justify-center">
		<div class="mt-8">
			<img
				data-flip-id="movie-{movie.id}"
				class="movie-id object-cover"
				width="320"
				height="480"
				src={posterImage}
				alt="Movie poster"
			/>
		</div>
		<div class="my-8 min-w-[240px] max-w-lg space-y-3 text-start text-xl text-neutral-200">
			{#if movie.title !== movie.original_title}
				<p class="movie-details-animation">
					<strong>Original Title: </strong>{movie.original_title}
				</p>
			{/if}
			<h1 class="movie-details-animation"><strong> Title: </strong>{movie.title}</h1>
			<p class="movie-details-animation"><strong> Description: </strong>{movie.overview}</p>
			<p class="movie-details-animation"><strong> Released: </strong>{movie.release_date}</p>
			<p class="movie-details-animation">
				<strong>Genres: </strong>{movie.genres?.map((item) => item.name).join(', ')}
			</p>
			<p class="movie-details-animation flex items-center gap-2">
				<strong>Rating:</strong>
				{movie.vote_average.toFixed(2)}
				<span class="text-yellow-400">
					<Icon icon="bi:star" width={24} class="text-gray-100" /></span
				>
			</p>
		</div>
	</main>

	{#if trailer.length}
		<h2 class="movie-details-animation text-center text-2xl font-bold">Trailer:</h2>

		<article
			class="movie-details-animation relative z-[1] mx-auto my-8 h-[40vw] max-h-[420px] w-[60vw] min-w-[320px] max-w-[768px]"
		>
			<iframe
				class="absolute left-0 top-0 h-full w-full"
				allowfullscreen
				title={movie.title}
				width="100%"
				height="100%"
				src={'https://www.youtube.com/embed/' + trailer[0].key}
				frameborder="0"
			/>
		</article>
	{/if}

	<hr class="mx-[10%]" />

	<!-- Recommendations section -->
	<div class="mt-4">
		<MoviesGrid {hasMore} {loadMore} data={data.recommendations} title="You can also watch" />
	</div>
</section>

<style>
	.image-container,
	.image2-container {
		width: 70vw;
		height: 40rem;
	}
	.image-container {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		-webkit-mask-image: linear-gradient(to top, transparent 23%, black 100%);
		mask-image: linear-gradient(to top, transparent 23%, black 100%);
	}

	.image2-container {
		-webkit-mask-image: linear-gradient(to right, transparent 3%, black 30%);
		mask-image: linear-gradient(to right, transparent 3%, black 30%);
	}
</style>
