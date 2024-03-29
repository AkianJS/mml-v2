<script lang="ts">
	import placeholder from '$lib/assets/image-placeholder.png';
	import type { Genre, Movie } from '$lib/interfaces/movie.interface';
	import Icon from '@iconify/svelte';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	export let movie: Movie;
	export let id: number;

	let activeImageRef: HTMLImageElement;
	let hiddenImageRef: HTMLImageElement;
	let imageContainerRef: HTMLElement;
	let wasCardClicked = false;
	let tl: GSAPTimeline;

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

	const animateCardEnter = () => {
		tl = gsap
			.timeline()
			.to(activeImageRef, {
				duration: 0.3,
				ease: 'power2.out',
				x: imageContainerRef.offsetWidth,
				opacity: 0
			})
			.fromTo(
				hiddenImageRef,
				{
					x: -imageContainerRef.offsetWidth,
					opacity: 0
				},
				{
					duration: 0.3,
					ease: 'power2.in',
					x: 0,
					opacity: 1
				},
				'<'
			)
			.to(imageContainerRef, {
				width: '500px',
				height: '280px',
				duration: 0.4,
				ease: 'power2.out'
			})
			.to(hiddenImageRef, {
				width: '500px',
				height: '280px',
				duration: 0.2,
				ease: 'power2.out'
			});
	};

	const animateCardLeave = () => {
		if (wasCardClicked) return;

		if (tl) tl.reverse();
	};

	const handleCardClicked = () => {
		wasCardClicked = true;
	};
</script>

<a
	on:mouseenter={animateCardEnter}
	on:mouseleave={animateCardLeave}
	on:click={handleCardClicked}
	href={`/movies/${movie.id}`}
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
			data-flip-id="movie-{movie.id}"
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
	<p class="absolute right-2 top-0 flex items-center gap-x-2">
		{movie.vote_average?.toFixed(2)}
		<Icon icon="bi:star-fill" width={24} class="text-yellow-400" />
	</p>
</a>
