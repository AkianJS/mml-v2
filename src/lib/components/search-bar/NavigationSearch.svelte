<script lang="ts">
	import { goto } from '$app/navigation';
	import { filter, filterInitialValues } from '$lib/store/filter.store';
	import Icon from '@iconify/svelte';

	let value = '';

	function onMovieSearch() {
		filter.set(filterInitialValues);
		goto(`/movies?search=${value}`);
		value = '';
	}
</script>

<div class="flex items-center justify-center">
	<div class="relative">
		<input
			bind:value
			on:keydown={(event) => event.key === 'Enter' && onMovieSearch()}
			type="text"
			class="focus:border-primary focus:ring-primary h-10 w-[40vw] min-w-20 max-w-80 rounded-2xl bg-secondary px-4 py-2 pl-10 text-sm text-gray-100 placeholder-gray-100 focus:outline-none focus:ring-1"
			placeholder="Search for a movie"
		/>
		<button on:click={onMovieSearch} type="submit" class="absolute left-2 top-2/4 -translate-y-2/4">
			<Icon icon="bi:search" width={24} class="text-gray-100" />
		</button>
	</div>
</div>
