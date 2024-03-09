<script lang="ts">
	import { filter } from '$lib/store/filter.store';
	import { getFiltersFromStore } from '$lib/utils/library';
	import NavbarItem from './NavbarItem.svelte';
	import type { NavbarItemI } from './navbar.interface';
	import ResponsiveMenu from './responsive-menu/ResponsiveMenu.svelte';

	export let navbarItems: NavbarItemI[] = [];

	let leftItems = navbarItems.filter((item) => item.position === 'left');
	const centerItems = navbarItems.filter((item) => item.position === 'center');
	const rightItems = navbarItems.filter((item) => item.position === 'right');

	filter.subscribe((value) => {
		let newLeftItem = leftItems.map((item) => {
			if (item.link?.includes('movies')) {
				let newLink = getFiltersFromStore();
				item.link = `/movies?${newLink}`;
				console.log('item.link', item.link);
			}
			return item;
		});
		leftItems = newLeftItem; // assign the new array to leftItems
	});
</script>

<nav class="sticky top-0 z-50 h-16 w-full border-b border-b-gray-500 bg-primary">
	<div class="mx-auto flex h-full max-w-screen-2xl content-center items-center justify-between">
		<div>
			<ul class="ml-2 hidden items-center justify-start gap-4 md:flex">
				{#each leftItems as item}
					{#key leftItems}
						<NavbarItem navbarItem={item} />
					{/key}
				{/each}
			</ul>
			<nav class="md:hidden">
				<ResponsiveMenu navbarItem={leftItems} />
			</nav>
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
