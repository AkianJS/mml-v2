<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="flex items-center justify-center">
	<div class="relative">
		<input
			type="text"
			class="focus:border-primary focus:ring-primary h-10 w-[40vw] min-w-20 max-w-80 rounded-2xl bg-secondary px-4 py-2 pl-10 text-sm text-gray-100 placeholder-gray-100 focus:outline-none focus:ring-1"
			placeholder="Search for a movie"
		/>
		<button class="absolute left-2 top-2/4 -translate-y-2/4">
			<Icon icon="bi:search" width={24} class="text-gray-100" />
		</button>
	</div>
</div>
