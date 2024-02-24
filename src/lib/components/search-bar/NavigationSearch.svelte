<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="flex items-center justify-center">
	<div class="relative">
		<input
			type="text"
			class="min-w-20 w-[40vw] max-w-80 h-10 px-4 pl-10 py-2 text-sm text-gray-100 placeholder-gray-100 bg-secondary rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
			placeholder="Search for a movie"
		/>
		<button class="absolute left-2 top-2/4 -translate-y-2/4">
			<Icon icon="bi:search" width={24} class="text-gray-100" />
		</button>
	</div>
</div>
