<script lang="ts" context="module">
	import { onMount } from 'svelte';
	import Navbar1 from '$lib/dashboard/Navbar1.svelte';
	import Breadcrumb from '$lib/dashboard/Breadcrumb.svelte';
</script>

<script lang="ts">
	let user: string;
	let autorization = true;

	let failed = false;

	onMount(() => {
		let token = document.cookie.replace('token=', '');
		fetch(`http://${location.hostname}:5123/verify`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((res) => {
				autorization = false;
				if (res.ok) {
					res.json().then((res) => {
						user = res.user.login;
					});
				} else {
					failed = true;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
</script>

{#if autorization}
	<div class="h-screen flex justify-center items-center bg-black opacity-75">
		<div
			class="flex justify-center items-center bg-white rounded-lg shadow flex-col p-10 space-y-4 w-1/2"
		>
			<h1 class="text-3xl font-bold">Trwa autoryzacja...</h1>
			<div class="text-3xl text-blue-600 animate-spin">
				<i class="fa-solid fa-gear" />
			</div>
		</div>
	</div>
{/if}

{#if failed}
	<div class="h-screen flex justify-center items-center bg-black opacity-75">
		<div
			class="flex justify-center items-center bg-white rounded-lg shadow flex-col p-10 space-y-6 w-1/2"
		>
			<i class="fa-solid fa-person-circle-xmark text-4xl font-bold text-red-600" />
			<h1 class="text-3xl font-bold">Autoryzacja nie powiodła się!</h1>
			<a
				href="/auth/login"
				class="border-2 px-4 rounded-lg shadow bg-red-600 py-2 text-white font-bold mt-4 hover:bg-white border-red-600 hover:text-red-600"
				>Zaloguj się ponownie</a
			>
		</div>
	</div>
{/if}

<section class="h-screen w-full flex flex-row">
	<Navbar1 {user} />
	<main class="w-full h-full p-4">
		<Breadcrumb />
		<slot />
	</main>
</section>
