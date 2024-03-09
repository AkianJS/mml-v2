<script lang="ts">
	import { link$ } from '$lib/store/filter.store';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import NavbarItem from '../NavbarItem.svelte';
	import type { NavbarItemI } from '../navbar.interface';

	let isOpen = false;
	let boxRef: HTMLDivElement;
	let menuButtonRef: HTMLButtonElement;
	let background: HTMLDivElement;

	export let navbarItem: NavbarItemI[];

	onMount(() => {
		console.log('created');
		// Close the menu when the user clicks outside of it
		window.addEventListener('click', (e) => {
			if (
				isOpen &&
				!menuButtonRef?.contains(e.target as Node) &&
				!boxRef?.contains(e.target as Node)
			) {
				toggleMenu();
			}
		});

		navbarItem.forEach((item) => {
			item.action = () => {
				link$.set(item.link ?? '');
				if (isOpen) toggleMenu();
			};
		});
	});

	function toggleMenu() {
		// Animation to open the menu
		if (!isOpen) {
			isOpen = true;
			gsap.to(background, {
				transformOrigin: 'center',
				duration: 0.1,
				scale: 100
			});
			gsap.to(boxRef, {
				duration: 0.3,
				width: window.innerWidth < 640 ? '75%' : '50%',
				height: '100%',
				top: 0,
				left: 0
			});
			gsap.fromTo(
				'.navbar-items-animation',
				{
					delay: 0.3,
					y: 100,
					opacity: 0
				},
				{
					duration: 0.3,
					y: 0,
					opacity: 1,
					stagger: 0.1
				}
			);
		} else if (isOpen) {
			// Animation to close the menu
			isOpen = false;
			gsap.to(boxRef, {
				delay: 0.3,
				duration: 0,
				width: '3rem',
				height: '3rem',
				transformOrigin: 'top left'
			});
			gsap.to(background, {
				duration: 0.3,
				scale: 1,
				transformOrigin: 'center'
			});
		}
	}
</script>

<button
	bind:this={menuButtonRef}
	class="relative left-2 z-30 flex h-12 w-8 flex-col items-center justify-center gap-1 p-1 text-black"
	on:click={toggleMenu}
>
	<div class:open={isOpen} class="burger"></div>
	<div class:open={isOpen} class="burger"></div>
	<div class:open={isOpen} class="burger"></div>
</button>
<div
	bind:this={boxRef}
	class="fixed left-0 top-0 z-10 h-14 w-12 overflow-hidden shadow-2xl shadow-black"
>
	<div
		class="absolute left-2 top-4 z-20 h-8 w-8 rounded-full bg-secondary"
		bind:this={background}
	></div>
	<ul
		class:flex={isOpen}
		class:hidden={!isOpen}
		class="absolute z-30 h-full w-full flex-col items-center justify-center gap-4 text-2xl"
	>
		{#each navbarItem as item}
			<NavbarItem animationClass="navbar-items-animation" textSize="text-2xl" navbarItem={item} />
		{/each}
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
