<script lang="ts">
	import MoviesGrid from '$lib/components/movies-grid/MoviesGrid.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<MoviesGrid infiniteScroll={false} {data} title="Discover" />
