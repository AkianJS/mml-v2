<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { populateNavbarItemI } from '$lib/components/layout/navbarItems';
	import '../app.css';

	const navbarItems = populateNavbarItemI();
</script>

<Navbar {navbarItems} />
<main class="mx-auto max-w-screen-2xl p-4">
	<slot />
</main>
