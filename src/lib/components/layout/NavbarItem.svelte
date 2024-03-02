<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { NavbarItemI } from './navbar.interface';

	export let navbarItem: NavbarItemI;
	export let textSize = 'text-sm';
	export let animationClass = '';
</script>

<li class={animationClass}>
	{#if navbarItem.link && navbarItem.type === 'normal'}
		<a
			href={navbarItem.link}
			class="flex gap-2 {textSize} text-white transition-all hover:scale-105"
		>
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
		<button
			on:click={navbarItem.action}
			class="flex gap-2 text-sm text-white transition-all hover:scale-105"
		>
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
