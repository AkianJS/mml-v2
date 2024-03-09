<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { ChipI } from './chip.interface';

	export let chip: ChipI;
	export let active: boolean;
</script>

<button
	class="flex items-center gap-2 rounded-2xl {active ? 'bg-green-600' : 'bg-secondary'} px-2 py-1"
	on:click={chip.action}
>
	{#if chip.icon}
		<Icon icon={chip.icon} />
	{/if}
	<p>{chip.label}</p>
</button>
