<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	export let items: {
		src: string;
		name: string;
	}[];

	export let active = 0;
	export let interval = 2000;
	export let pause = true;
	export let keyboard = true;
	export let controls = true;

	let timer: number | null;
	let carouselContainerRef: HTMLDivElement;
	let imageContainerRef: HTMLDivElement[] = [];

	const set = (i: number) => {
		active = i;
	};

	const clear = () => {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	};

	const start = () => {
		if (interval && items.length > 1) {
			timer = setInterval(() => {
				const nextActive = active + getImagesInView();
				if (nextActive >= items.length) {
					set(0);
				} else {
					set(++active);
				}
			}, interval);
		}
	};

	const stop = () => {
		clear();
	};

	const restart = () => {
		clear();
		start();
	};

	onMount(() => {
		length = items.length * (carouselContainerRef?.clientWidth / imageContainerRef[0]?.clientWidth);
		start();
		return stop;
	});

	const handleMouseEnter = () => {
		if (pause) stop();
	};

	const handleMouseLeave = () => {
		if (pause) restart();
	};

	const handleKeyboard = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowLeft':
				set(active - 1);
				break;
			case 'ArrowRight':
				set(active + 1);
				break;
		}
	};

	const getImagesInView = () => {
		if (!carouselContainerRef || !imageContainerRef.length) return 0;
		const carouselWidth = carouselContainerRef.clientWidth;
		const imageWidth = imageContainerRef[0].clientWidth;
		const imagesInView = Math.floor(carouselWidth / imageWidth);
		return imagesInView;
	};
</script>

<div
	bind:this={carouselContainerRef}
	class="relative my-8 h-full w-full overflow-hidden"
	role="button"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:keydown={keyboard ? handleKeyboard : undefined}
	tabindex="0"
>
	<div class="h-full w-full overflow-hidden">
		<div
			class="relative flex h-full transition-transform duration-1000 ease-in-out"
			style="transform: translateX(-{active * imageContainerRef[0]?.clientWidth}px); width: {100 *
				items.length}%;"
		>
			{#each items as item, i}
				<div bind:this={imageContainerRef[i]} class="h-full rounded-2xl px-2">
					<img class="h-full w-full rounded-2xl object-fill" src={item.src} alt={item.name} />
				</div>
			{/each}
		</div>
	</div>

	{#if controls}
		<div class="absolute bottom-0 top-0 flex h-full w-full items-center">
			<button
				class="absolute bottom-0 top-2/4 z-10 ml-2 flex h-12 w-12 -translate-y-2/4 items-center justify-center rounded-full bg-black bg-opacity-50 text-4xl text-white focus:outline-none"
				on:click={() => set(active - 1)}
			>
				<Icon icon="ic:baseline-arrow-left" />
			</button>
			<button
				class="absolute bottom-0 right-0 top-2/4 z-10 mr-2 flex h-12 w-12 -translate-y-2/4 items-center justify-center rounded-full bg-black bg-opacity-50 text-4xl text-white focus:outline-none"
				on:click={() => set(active + 1)}
			>
				<Icon icon="ic:baseline-arrow-right" />
			</button>
		</div>
	{/if}
</div>
