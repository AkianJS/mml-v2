<script lang="ts">
	import NavbarItem from './NavbarItem.svelte';
	import type { NavbarItemI } from './navbar.interface';

	export let navbarItems: NavbarItemI[] = [];

	const leftItems = navbarItems.filter((item) => item.position === 'left');
	const centerItems = navbarItems.filter((item) => item.position === 'center');
	const rightItems = navbarItems.filter((item) => item.position === 'right');
</script>

<nav class="w-full h-16 bg-primary border-b border-b-gray-500">
	<div class="max-w-screen-2xl content-center mx-auto h-full flex justify-between items-center">
		<div>
			<ul class="flex items-center justify-start">
				{#each leftItems as item}
					<NavbarItem navbarItem={item} />
				{/each}
			</ul>
		</div>

		<div>
			<ul class="flex items-center justify-center">
				{#each centerItems as item}
					<NavbarItem navbarItem={item} />
				{/each}
			</ul>
		</div>

		<div>
			<ul class="flex items-center justify-end">
				{#each rightItems as item}
					<NavbarItem navbarItem={item} />
				{/each}
			</ul>
		</div>
	</div>
</nav>
