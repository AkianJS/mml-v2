<script lang="ts">
	import { afterNavigate, beforeNavigate, pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { populateNavbarItemI } from '$lib/components/layout/navbarItems';
	import { filter, initialValues, link$ } from '$lib/store/filter.store';
	import { getFiltersFromStore } from '$lib/utils/library';
	import { Flip } from '$lib/utils/scripts';
	import '../app.css';

	const navbarItems = populateNavbarItemI();

	let state: Flip.FlipState;

	beforeNavigate(() => {
		state = Flip.getState('.movie-id');
		// If the user is navigating to the movies page, we need to check if the user is searching for a movie
		link$.subscribe((link) => {
			if (link === '/movies') {
				const searchParams = $page.url.searchParams.get('search');

				if (searchParams) {
					filter.set(initialValues);
				}

				const filters = getFiltersFromStore();
				if (filters) {
					pushState(`/movies?${filters}`, {});
				}
			}
		});
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
