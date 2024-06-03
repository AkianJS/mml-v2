<script lang="ts">
	import placeholder from '$lib/assets/image-placeholder.png';
	import type { ImageInterface } from '$lib/interfaces/images.interface';
	import type { Genre, MovieDetail, VideosType } from '$lib/interfaces/movie.interface';
	import { currentMovie } from '$lib/store/current-movie.store';
	import { getMovies } from '$lib/utils/movies-fetch';
	import Icon from '@iconify/svelte';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	export let movie: MovieDetail;
	export let id: number;

	const images: Promise<ImageInterface> = getMovies({ url: `movie/${movie.id}/images`, fetch });

	const videos: Promise<VideosType> = getMovies({ url: `movie/${movie.id}/videos`, fetch });

	let activeImageRef: HTMLImageElement;
	let hiddenImageRef: HTMLImageElement;
	let imageContainerRef: HTMLElement;

	const randNumber = Math.floor(Math.random() * 10);

	function getImageUrl(backdrop_path?: string) {
		return backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : placeholder;
	}

	function getHiddenImageUrl(poster_path?: string) {
		return poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : placeholder;
	}

	function getGenres(genres?: Genre[]) {
		return genres?.map((genre) => genre.name).join(', ');
	}

	function getRuntime(runtime?: number) {
		return runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}mins` : '';
	}

	let animation = (id: number) =>
		gsap.fromTo(
			`.card-animation-${id}`,
			{
				opacity: 0,
				y: 100
			},
			{
				delay: (randNumber % 20) * 0.1,
				opacity: 1,
				y: 0,
				duration: 0.3,
				ease: 'power2.out'
			}
		);

	onMount(() => {
		animation(id);
	});

	function handleOpenMovieDetails() {
		currentMovie.set({
			movie,
			streamed: {
				images,
				videos
			},
			opened: true
		});
	}
</script>

<button
	on:click={handleOpenMovieDetails}
	class={`card-animation-${id} relative w-96 space-y-2 overflow-hidden sm:w-[250px]`}
>
	<figure
		class="w-96 overflow-hidden rounded-2xl sm:h-[140px] sm:w-[250px]"
		bind:this={imageContainerRef}
	>
		<img
			bind:this={activeImageRef}
			class="w-96 rounded-2xl object-cover sm:h-[140px] sm:w-[250px]"
			width="250"
			height="140"
			src={getImageUrl(movie.backdrop_path)}
			alt={movie.title}
		/>
		<img
			bind:this={hiddenImageRef}
			class="movie-id absolute left-0 top-0 w-96 rounded-2xl object-cover opacity-0 sm:h-[140px] sm:w-[250px]"
			src={getHiddenImageUrl(movie.poster_path)}
			alt={movie.title}
			width="250"
			height="140"
		/>
	</figure>
	<h2 class="font-semibold">{movie.title}</h2>
	<p>{getRuntime(movie?.runtime)} · {getGenres(movie.genres)}</p>
	<p class="absolute -top-2 right-0 flex items-center gap-x-2 rounded-lg bg-black p-1">
		{movie.vote_average?.toFixed(2)}
		<Icon icon="bi:star-fill" width={24} class="text-yellow-400" />
	</p>
</button>
