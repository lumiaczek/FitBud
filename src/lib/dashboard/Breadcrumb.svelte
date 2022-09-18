<script lang="ts" context="module">
	import { onDestroy } from 'svelte';
</script>

<script lang="ts">
	import current from '$lib/dashboard/Breadcrumb';

	const changeHome = () => {
		current.set('');
	};

	onDestroy(() => {
		current.set('');
	});
</script>

<div class="flex flex-row mb-4 shadow-lg rounded-lg p-4 w-fit border border-gray-600">
	<div class="font-bold flex flex-row items-center gap-3">
		<a href="/dashboard" on:click={changeHome}><i class="fa-solid fa-house text-blue-600" /></a>
		<i class="fa-solid fa-chevron-right" />
		{#if $current === ''}
			<a href="/dashboard" on:click={changeHome} class="">Panel główny</a>
		{/if}
		{#if $current !== ''}
			<a href="/dashboard" on:click={changeHome} class="text-gray-500">Panel główny</a>
		{/if}
	</div>
	{#if $current !== ''}
		<div class="font-bold ml-2 pl-2 text-gray-600">
			<div class="flex flex-row items-center">
				<i class="fa-solid fa-chevron-right" />
				<p class="text-black font-bold ml-4">{$current}</p>
			</div>
		</div>
	{/if}
</div>
