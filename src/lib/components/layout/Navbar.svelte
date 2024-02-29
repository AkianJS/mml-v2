<script lang="ts">
	import NavbarItem from './NavbarItem.svelte';
	import type { NavbarItemI } from './navbar.interface';

	export let navbarItems: NavbarItemI[] = [];

	const leftItems = navbarItems.filter((item) => item.position === 'left');
	const centerItems = navbarItems.filter((item) => item.position === 'center');
	const rightItems = navbarItems.filter((item) => item.position === 'right');
</script>

<nav class="h-16 w-full border-b border-b-gray-500 bg-primary">
	<div class="mx-auto flex h-full max-w-screen-2xl content-center items-center justify-between">
		<div>
			<ul class="ml-2 flex items-center justify-start gap-2">
				{#each leftItems as item}
					<NavbarItem navbarItem={item} />
				{/each}
			</ul>
		</div>

		<div>
			<ul class="flex items-center justify-center gap-2">
				{#each centerItems as item}
					<NavbarItem navbarItem={item} />
				{/each}
			</ul>
		</div>

		<div>
			<ul class="mr-2 flex items-center justify-end gap-2">
				{#each rightItems as item}
					<NavbarItem navbarItem={item} />
				{/each}
			</ul>
		</div>
	</div>
</nav>
