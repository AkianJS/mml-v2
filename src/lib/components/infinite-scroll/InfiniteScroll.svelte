<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onDestroy, onMount } from 'svelte';

	export let hasMore = false;
	export let loadFunction: () => void;

	let loadingRef: HTMLElement | undefined;
	let isLoading = false;

	onMount(() => {
		if (!loadingRef) return;

		const observer = new IntersectionObserver((entries) => {
			const element = entries[0];

			if (element.isIntersecting && hasMore && !isLoading) {
				isLoading = true;
				loadFunction();
				isLoading = false;
			}
		});
		observer.observe(loadingRef);
	});

	onDestroy(() => {
		if (loadingRef) {
			const observer = new IntersectionObserver(() => {});
			observer.unobserve(loadingRef);
		}
	});
</script>

<div class="mt-4 flex items-center justify-center" bind:this={loadingRef}>
	<Icon width={54} icon="svg-spinners:12-dots-scale-rotate" />
</div>
