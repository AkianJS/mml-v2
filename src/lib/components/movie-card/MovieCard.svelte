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

	let images: Promise<ImageInterface>;

	let videos: Promise<VideosType>;

	const randNumber = Math.floor(Math.random() * 10);

	function getImageUrl(backdrop_path?: string) {
		return backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : placeholder;
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
		images = getMovies({ url: `movie/${movie.id}/images`, fetch });
		videos = getMovies({ url: `movie/${movie.id}/videos`, fetch });
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
	<figure class="w-96 overflow-hidden rounded-2xl sm:h-[140px] sm:w-[250px]">
		<img
			class="w-96 rounded-2xl object-cover sm:h-[140px] sm:w-[250px]"
			width="250"
			height="140"
			src={getImageUrl(movie.backdrop_path)}
			alt={movie.title}
		/>
	</figure>
	<h2 class="font-semibold">{movie.title}</h2>
	<p>{getRuntime(movie?.runtime)} · {getGenres(movie.genres)}</p>
	<p class="absolute -top-2 right-0 flex items-center gap-x-2 rounded-lg bg-black p-1">
		{movie.vote_average?.toFixed(2)}
		<Icon icon="bi:star-fill" width={24} class="text-yellow-400" />
	</p>
</button>
