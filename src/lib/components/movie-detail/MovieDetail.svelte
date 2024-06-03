<script lang="ts">
	import placeholder from '$lib/assets/image-placeholder.png';
	import type { CurrentMovieStore } from '$lib/store/current-movie.store';
	import Icon from '@iconify/svelte';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	export let data: CurrentMovieStore;
	// export let loadMore: () => void;
	// export let hasMore: boolean;

	let backdropImage: string;
	let posterImage: string;

	onMount(() => {
		data.streamed.images.then((images) => {
			backdropImage =
				images.backdrops.length > 0
					? `https://image.tmdb.org/t/p/original${images.backdrops[0].file_path}`
					: placeholder;
			posterImage =
				images.posters.length > 0
					? `https://image.tmdb.org/t/p/original${images.posters[0].file_path}`
					: placeholder;
		});

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

<section class="h-full w-full overflow-auto px-4">
	<div class="image2-container fixed right-0 top-16 -z-10 w-2/4 opacity-70">
		<div
			style={`background-image: url(${backdropImage})`}
			class="image-container absolute right-0 top-0 w-full bg-teal-800"
		/>
	</div>
	<main class="relative mb-8 flex flex-wrap gap-6 px-8 max-[1080px]:justify-center">
		<div class="mt-8">
			<img
				class="movie-id object-cover"
				width="320"
				height="480"
				src={posterImage}
				alt="Movie poster"
			/>
		</div>
		<div class="my-8 min-w-[240px] max-w-lg space-y-3 text-start text-xl text-neutral-200">
			{#if data.movie.title !== data.movie.original_title}
				<p class="movie-details-animation">
					<strong>Original Title: </strong>{data.movie.original_title}
				</p>
			{/if}
			<h1 class="movie-details-animation"><strong> Title: </strong>{data.movie.title}</h1>
			<p class="movie-details-animation"><strong> Description: </strong>{data.movie.overview}</p>
			<p class="movie-details-animation"><strong> Release: </strong>{data.movie.release_date}</p>
			<p class="movie-details-animation">
				<strong>Genres: </strong>{data.movie.genres?.map((item) => item.name).join(', ')}
			</p>
			<p class="movie-details-animation flex items-center gap-2">
				<strong>Rating:</strong>
				{data.movie.vote_average.toFixed(2)}
				<span class="text-yellow-400">
					<Icon icon="bi:star" width={24} class="text-gray-100" /></span
				>
			</p>
		</div>
	</main>

	{#await data.streamed.videos}
		<div class="mt-4 flex items-center justify-center">
			<Icon width={54} icon="svg-spinners:12-dots-scale-rotate" />
		</div>
	{:then video}
		{@const trailer = video.results?.filter((item) => {
			return item.type.toLocaleLowerCase() === 'trailer';
		})}
		{#if trailer.length}
			<h2 class="movie-details-animation text-center text-2xl font-bold">Trailer:</h2>

			<article
				class="movie-details-animation relative z-[1] mx-auto my-8 h-[40vw] max-h-[420px] w-[90%] min-w-[320px] max-w-[768px]"
			>
				<iframe
					class="absolute left-0 top-0 h-full w-full"
					allowfullscreen
					title={data.movie.title}
					width="100%"
					height="100%"
					src={'https://www.youtube.com/embed/' + trailer[0].key}
					frameborder="0"
				/>
			</article>
		{/if}
	{/await}

	<hr class="mx-[10%]" />
	<!-- {#if data.recommendations?.results?.length}
		Recommendations section
		<div class="mt-4">
			<MoviesGrid {hasMore} {loadMore} data={data.recommendations} title="You can also watch" />
		</div>
	{:else}
		<div class="mt-4 flex items-center justify-center">
			<Icon width={54} icon="svg-spinners:12-dots-scale-rotate" />
		</div>
	{/if} -->
</section>

<style>
	.image-container,
	.image2-container {
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
