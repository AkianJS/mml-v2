<script lang="ts">
	import placeholder from '$lib/assets/image-placeholder.png';
	import type { Movie } from '$lib/interfaces/movie.interface';
	import Icon from '@iconify/svelte';

	export let movie: Movie;
	const imageUrl = movie.backdrop_path
		? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
		: placeholder;
	const genres = movie?.genres?.map((genre) => genre.name).join(', ');
	const parsedRuntime = movie.runtime
		? `${Math.floor(movie?.runtime / 60)}h ${movie?.runtime % 60}mins`
		: '';
</script>

<a href={`/movies/${movie.id}`} class="relative space-y-2 overflow-hidden">
	<img
		class="h-[140px] w-[250px] rounded-2xl object-cover"
		width="250"
		height="140"
		src={imageUrl}
		alt={movie.title}
	/>
	<h2 class="font-semibold">{movie.title}</h2>
	<p>{parsedRuntime} · {genres}</p>
	<p class="absolute right-2 top-0 flex items-center gap-x-2">
		{movie.vote_average?.toFixed(2)}
		<Icon icon="bi:star-fill" width={24} class="text-yellow-400" />
	</p>
</a>

<style lang="postcss">
</style>
