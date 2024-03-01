<script lang="ts">
	import gsap from 'gsap';
	import NavbarItem from '../NavbarItem.svelte';
	import type { NavbarItemI } from '../navbar.interface';

	let isOpen = false;
	let box: HTMLDivElement;
	let background: HTMLDivElement;

	export let navbarItem: NavbarItemI;

	function toggleMenu() {
		if (!isOpen) {
			isOpen = true;
			// Background animation
			gsap.to(background, {
				transformOrigin: 'center',
				duration: 0.1,
				scale: 100
			});
			// Box animation
			gsap.to(box, {
				duration: 0.3,
				width: '50%',
				height: '100%',
				top: 0,
				left: 0
			});
		} else if (isOpen) {
			isOpen = false;
			// Box animation
			gsap.to(box, {
				delay: 0.3,
				duration: 0,
				width: '3rem',
				height: '3rem',
				transformOrigin: 'top left'
			});
			// Background animation
			gsap.to(background, {
				duration: 0.3,
				scale: 1,
				transformOrigin: 'center'
			});
		}
	}
</script>

<button
	class="relative left-2 z-30 flex h-12 w-8 flex-col items-center justify-center gap-1 p-1 text-black"
	on:click={toggleMenu}
>
	<div class:open={isOpen} class="burger"></div>
	<div class:open={isOpen} class="burger"></div>
	<div class:open={isOpen} class="burger"></div>
</button>
<div bind:this={box} class="fixed left-0 top-0 z-10 h-14 w-12 overflow-hidden">
	<div
		class="absolute left-2 top-4 z-20 h-8 w-8 rounded-full bg-secondary"
		bind:this={background}
	></div>
	<ul class="absolute z-30 hidden h-full w-full items-center justify-center">
		<NavbarItem {navbarItem} />
	</ul>
</div>

<style>
	.burger {
		width: 1rem;
		height: 2px;
		background-color: white;
		transition-duration: 0.3s;
	}

	.open {
		width: 1.5rem;
	}

	.open:nth-child(1) {
		transform: translate(0px, 6px) rotate(45deg);
	}
	.open:nth-child(2) {
		opacity: 0;
	}
	.open:nth-child(3) {
		transform: translate(0px, -6px) rotate(-45deg);
	}
</style>
