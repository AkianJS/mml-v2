<script lang="ts">
	import Drawer from '$lib/components/drawer/Drawer.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { populateNavbarItemI } from '$lib/components/layout/navbarItems';
	import MovieDetail from '$lib/components/movie-detail/MovieDetail.svelte';
	import { currentMovie } from '$lib/store/current-movie.store';
	import '../app.css';

	const navbarItems = populateNavbarItemI();
</script>

<Navbar {navbarItems} />
<div class="fixed bottom-0 left-0 right-0 top-16">
	<main class="h-full w-full overflow-auto">
		<div class="mx-auto max-w-screen-2xl px-4">
			<slot />
		</div>
	</main>
</div>

<Drawer open={$currentMovie?.opened}>
	{#if $currentMovie}
		<MovieDetail data={$currentMovie} />
	{/if}
</Drawer>
