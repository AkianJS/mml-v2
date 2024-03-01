<script lang="ts">
	import MoviesGrid from '$lib/components/movies-grid/MoviesGrid.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const hasMore = false;
	const loadMore = () => {
		return;
	};
</script>

<MoviesGrid {hasMore} {loadMore} infiniteScroll={false} {data} title="Discover" />
