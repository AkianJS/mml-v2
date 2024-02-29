<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let hasMore: boolean;
	export let loadFunction: () => void;

	let loadingRef: HTMLElement | undefined;

	onMount(() => {
		if (!loadingRef) return;

		const observer = new IntersectionObserver((entries) => {
			const element = entries[0];

			if (element.isIntersecting && hasMore) {
				loadFunction();
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

<div bind:this={loadingRef}></div>
