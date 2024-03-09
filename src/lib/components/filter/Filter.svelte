<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Genre } from '$lib/interfaces/movie.interface';
	import { filter } from '$lib/store/filter.store';
	import { getMovies } from '$lib/utils/movies-fetch';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import Chip from '../chip/Chip.svelte';

	let filterRef: HTMLDivElement;
	let filterButtonRef: HTMLButtonElement;
	let genres: Genre[];

	let isFilterOpen = false;
	let isTopSelected = false;
	let isAdultSelected = false;
	let selectedGenre = 0;

	// Array from year 1980 to current year
	let years = Array.from(
		{ length: new Date().getFullYear() - 1980 + 1 },
		(_, k) => k + 1980
	).reverse();

	years.unshift(0);

	// Get the filter from the store
	onMount(async () => {
		window.addEventListener('click', (e) => {
			if (
				filterRef &&
				!filterRef.contains(e.target as Node) &&
				!filterButtonRef.contains(e.target as Node)
			) {
				isFilterOpen = false;
			}
		});

		const data = await getMovies({ url: 'genre/movie/list', fetch });

		genres = data.genres;
		genres.unshift({ id: 0, name: 'All' });

		const searchParams = $page.url.searchParams;

		const isSearchActive = searchParams.get('search');

		if (isSearchActive) return (selectedGenre = 0);

		const isGenreActive = searchParams.get('genre');

		if (isGenreActive) filter.set({ ...$filter, genre: parseInt(isGenreActive) });

		if ($filter.year) {
			const yearIndex = years.indexOf(parseInt($filter.year));
			years.splice(yearIndex, 1);
			years.unshift(parseInt($filter.year));
		}
	});

	const pushYearParams = (year: string) => {
		const url = $page.url;
		url.searchParams.set('year', year.toString());
		filter.set({ ...$filter, year: year });
		goto(url);
	};

	const pushGenreParams = (genreId: number) => {
		const url = $page.url;
		url.searchParams.set('genre', genreId.toString());
		url.searchParams.delete('search');
		filter.set({ ...$filter, genre: genreId });
		goto(url);
	};

	const toggleFilter = () => {
		isFilterOpen = !isFilterOpen;
	};

	const onFilterSearch = () => {
		const url = new URL(window.location.href);
		if (isTopSelected && isAdultSelected) {
			url.searchParams.set('top', 'vote_average.desc');
			url.searchParams.set('adult', 'true');
			filter.set({ ...$filter, top: 'vote_average.desc', adult: 'true' });
		} else if (isTopSelected) {
			url.searchParams.set('top', 'vote_average.desc');
			url.searchParams.delete('adult');
			filter.set({ ...$filter, top: 'vote_average.desc', adult: undefined });
		} else if (isAdultSelected) {
			url.searchParams.set('adult', 'true');
			url.searchParams.delete('top');
			filter.set({ ...$filter, top: undefined, adult: 'true' });
		} else {
			url.searchParams.delete('top');
			url.searchParams.delete('adult');
			filter.set({ ...$filter, top: undefined, adult: undefined });
		}
		url.searchParams.delete('search');

		goto(url);
	};

	filter.subscribe((value) => {
		selectedGenre = value.genre ?? 0;
		isTopSelected = value.top === 'vote_average.desc';
		isAdultSelected = value.adult === 'true';
	});
</script>

<section class="mb-4 mt-8 flex flex-wrap gap-4">
	{#if genres}
		{#each genres as genre}
			<Chip
				active={selectedGenre === genre.id}
				chip={{ label: genre.name, action: () => pushGenreParams(genre.id), icon: '' }}
			/>
		{/each}
	{/if}
</section>

<div class="relative flex items-center justify-end">
	<select
		on:change={(e) => pushYearParams(e.currentTarget.value)}
		class="rounded-2xl border-none bg-secondary px-4 py-1 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
		name="year"
		id="year"
	>
		{#each years as year}
			<option class="bg-gray-700" value={year}>{year === 0 ? 'All' : year}</option>
		{/each}
	</select>

	<button
		bind:this={filterButtonRef}
		on:click={toggleFilter}
		class="relative ml-4 rounded-2xl bg-secondary px-2 py-2 duration-200 hover:scale-110"
	>
		<Icon icon="mage:filter" class="h-6 w-6 text-white" />
	</button>

	<div
		bind:this={filterRef}
		class:scale-100={isFilterOpen}
		class="checkbox absolute right-6 top-10 z-10 flex h-48 w-56 origin-top-right scale-0 flex-col gap-2 rounded-2xl bg-secondary p-4 shadow-2xl shadow-black duration-300 ease-linear"
	>
		<input checked={isTopSelected} id="top" bind:value={isTopSelected} type="checkbox" />
		<label for="top">Top Rated?</label>

		<input checked={isAdultSelected} id="adult" bind:value={isAdultSelected} type="checkbox" />
		<label for="adult">Include Adults?</label>

		<button
			on:click={onFilterSearch}
			class="font ml-auto mt-auto rounded-full bg-violet-800 p-2 duration-200 hover:scale-110"
		>
			<Icon icon="akar-icons:search" class="h-6 w-6 text-white" />
		</button>
	</div>
</div>

<style lang="postcss">
	label {
		@apply relative inline-block cursor-pointer pl-6;
	}

	label:before {
		content: '';
		@apply absolute bottom-1 left-0 inline-block h-4 w-4 bg-white;
	}

	input[type='checkbox'] {
		@apply hidden;
	}

	.checkbox label:before {
		@apply rounded-sm;
	}

	input[type='checkbox']:checked + label:before {
		content: '\2713';
		text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
		@apply text-center leading-4 text-green-600;
	}
</style>
