<script lang="ts">
	import type { NavbarItemI } from './navbar.interface';
	import Icon from '@iconify/svelte';

	export let navbarItem: NavbarItemI;
</script>

<li>
	{#if navbarItem.link && navbarItem.type === 'normal'}
		<a href={navbarItem.link} class="flex cursor-pointer gap-2 text-sm text-white">
			{#if navbarItem.icon}
				<span class="rounded-2xl bg-secondary p-2">
					<Icon width={24} height={24} icon={navbarItem.icon} />
				</span>
			{/if}
			{#if navbarItem.label}
				{navbarItem.label}
			{/if}
		</a>
	{:else if navbarItem.action && navbarItem.type === 'normal'}
		<button on:click={navbarItem.action} class="flex cursor-pointer gap-2 text-sm text-white">
			{#if navbarItem.icon}
				<Icon width={24} height={24} icon={navbarItem.icon} />
			{/if}
			{#if navbarItem.label}
				{navbarItem.label}
			{/if}
		</button>
	{:else if navbarItem.type === 'component'}
		<svelte:component this={navbarItem.component} />
	{/if}
</li>
