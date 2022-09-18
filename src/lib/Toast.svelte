<script lang="ts" context="module">
	import { fly } from 'svelte/transition';
</script>

<script lang="ts">
	export let name: string;
	export let status: string;
</script>

<div
	class={`flex z-50 fixed bottom-5 left-5 flex-col w-fit h-fit p-4 bg-red-600 rounded-lg shadow`}
	in:fly={{ x: -200, duration: 500 }}
	out:fly={{ x: -300, duration: 1000 }}
>
	<div class="flex flex-row items-center gap-2">
		{#if status === 'Failed'}
			<i class="fa-regular fa-circle-xmark font-bold text-white text-lg" />
		{/if}
		<h3 class="text-lg font-semibold text-white">{name}</h3>
	</div>
</div>
