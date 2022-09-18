<script lang="ts" context="module">
	import { goto } from '$app/navigation';
</script>

<script lang="ts">
	let searchQuerry: string;
	export let userName: string;
	let menuVisible = false;

	const logoff = () => {
		document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		goto('/');
	};

	const showMenu = () => {
		menuVisible = !menuVisible;
	};
</script>

<nav class="w-full h-16 p-6 flex flex-row justify-between ">
	<div class="flex flex-row items-center">
		<i class="fa-solid fa-magnifying-glass mr-3" />
		<input
			type="search"
			class="w-1/10 h-4 py-4 px-1 outline-none border-b-2 "
			bind:value={searchQuerry}
			placeholder="Wpisz coś aby wyszukać..."
		/>
	</div>
	<div on:click={showMenu} class="hover:underline cursor-pointer font-bold">
		<p>{userName}</p>
	</div>
</nav>
<div
	class="shadow-lg rounded-lg px-6 pb-4 flex justify-center items-center h-fit w-fit fixed top-14 z-50 bg-white right-5"
	class:hidden={!menuVisible}
>
	<button class="button flex flex-row items-center gap-2 button-danger " on:click={logoff}>
		<i class="fa-solid fa-user-xmark" />
		<p>Wyloguj się</p>
	</button>
</div>
