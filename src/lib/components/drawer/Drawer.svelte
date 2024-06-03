<script lang="ts">
	export let open = false;

	function handleOutsideClick(event) {
		if (event.target === event.currentTarget) {
			open = false;
		}
	}
</script>

<div
	class:hidden={!open}
	on:click={handleOutsideClick}
	class="fixed inset-0 z-50 bg-black bg-opacity-50"
></div>
<div
	class="fixed inset-y-0 right-0 z-50 bg-primary sm:w-3/4 xl:w-2/4 {open
		? 'translate-x-0'
		: 'translate-x-full'} duration-300 ease-in-out"
>
	{#if open}
		<slot />
	{/if}
</div>
