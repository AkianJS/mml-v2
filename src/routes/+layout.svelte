<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { populateNavbarItemI } from '$lib/components/layout/navbarItems';
	import { Flip } from '$lib/utils/scripts';
	import '../app.css';

	const navbarItems = populateNavbarItemI();

	let state: Flip.FlipState;

	beforeNavigate(() => {
		state = Flip.getState('.movie-id');
	});

	afterNavigate(() => {
		console.log('After', state);
		Flip.from(state, { duration: 0.5, scale: true, targets: '.movie-id' });
	});
</script>

<Navbar {navbarItems} />
{#if state}
	state {state}
{/if}
<main class="mx-auto max-w-screen-2xl p-4">
	<slot />
</main>
