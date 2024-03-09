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
		if (state) Flip.from(state, { duration: 0.3, scale: true, targets: '.movie-id' });
	});
</script>

<Navbar {navbarItems} />
<div class="fixed bottom-0 left-0 right-0 top-16">
	<main class="h-full w-full overflow-auto">
		<div class="mx-auto max-w-screen-2xl px-4">
			<slot />
		</div>
	</main>
</div>
