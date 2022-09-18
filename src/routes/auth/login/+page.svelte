<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Toast from '$lib/Toast.svelte';
</script>

<script lang="ts">
	onMount(() => {
		document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	});

	// site action variables
	let toast = false;
	let loading = false;

	// side data

	let user = {
		login: '',
		password: ''
	};

	let errors = {
		email: false,
		emailEmpty: false,
		passwordEmpty: false
	};

	// response handling variables

	let remember: boolean;
	let failcode: number;

	const switchRemeber = () => {
		remember = !remember;
	};

	const showToast = () => {
		toast = true;
		setTimeout(() => {
			toast = false;
		}, 2000);
	};

	const validateEmail = () => {
		if (
			!user.login.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			return false;
		}
		return true;
	};

	$: {
		if (user.login !== '') {
			errors.emailEmpty = false;
		}
		if (user.password !== '') {
			errors.passwordEmpty = false;
		}

		if (validateEmail()) {
			errors.email = false;
		}
	}

	const send = async () => {
		loading = true;

		if (user.login === '' || user.password === '') {
			if (user.login === '') {
				errors.emailEmpty = true;
				loading = false;
			}
			if (user.password === '') {
				errors.passwordEmpty = true;
				loading = false;
			}
			return;
		}

		if (!validateEmail()) {
			errors.email = true;
			loading = false;
			return;
		}

		await fetch(`http://${location.hostname}:5123/login`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (res.status == 404 || res.status == 403) {
					res.json().then((data) => {
						failcode = data.failcode;
						loading = false;
					});
					showToast();
				} else if (res.ok) {
					res.json().then((data) => {
						const token = data.token;
						document.cookie = 'token=' + token;
						loading = false;
					});
					goto('/dashboard');
				} else {
					showToast();
					loading = false;
				}
			})
			.catch((err) => {
				failcode = 3;
				showToast();
			});
	};
</script>

<svelte:head>
	<title>Zaloguj się do aplikacji</title>
</svelte:head>

<section class="min-h-screen background-login w-full flex justify-between">
	<div class="shadow-lg w-1/3 p-10 bg-white flex flex-col justify-center">
		<div class="mb-12">
			<h1 class="text-4xl text-center font-bold mb-1">Witaj ponownie!</h1>
			<h2 class="text-xl text-center">Proszę zaloguj się</h2>
		</div>
		<div class="flex items-center justify-center" />
		<div class="mt-4 flex flex-col justify-center space-y-4 w-full">
			<div class="flex flex-col">
				<label for="login" class="mb-1"
					><span class="text-[1rem] text-gray-600"> Login </span></label
				>
				<input
					type="text"
					class:input={errors.email == false}
					class:input-error={errors.email == true}
					class:input-empty={errors.emailEmpty == true}
					bind:value={user.login}
					placeholder="example@mail.com"
					id="login"
				/>
				{#if errors.email == true}
					<p class="text-sm text-red-600 mt-1">Wpisany email jest nie poprawny</p>
				{/if}

				{#if errors.emailEmpty == true}
					<p class="text-sm text-red-600 mt-1">Prosze wpisać email</p>
				{/if}
			</div>
			<div class="flex flex-col">
				<label for="password" class="mb-1 text-[1rem] text-gray-600"><span> Hasło </span></label>
				<input
					type="password"
					class:input={errors.passwordEmpty == false}
					class:input-empty={errors.passwordEmpty == true}
					bind:value={user.password}
					placeholder="examplE123!"
					id="password"
				/>
				{#if errors.passwordEmpty == true}
					<p class="text-sm text-red-600 mt-1">Prosze wpisać hasło</p>
				{/if}
			</div>
		</div>
		<div class="flex flex-row mt-4 justify-between items-center">
			<div class="flex flex-row">
				<input type="checkbox" name="remeber" id="remeber" bind:checked={remember} />
				<p class="text-sm text-gray-500 ml-2 cursor-pointer" on:click={switchRemeber}>
					Zapamiętaj mnie
				</p>
			</div>
			<a href="/" class="text-sm text-gray-500 hover:underline">Zapomniałem hasła</a>
		</div>
		<div class="flex flex-row justify-center">
			{#if !loading}
				<button on:click={send} class="button w-full">Zaloguj się</button>
			{/if}

			{#if loading}
				<button class="button ">
					<i class="fa-solid fa-gear animate-spin font-bold text-lg text-white " />
				</button>
			{/if}
		</div>

		<a href="/auth/signup" class="text-sm text-gray-500 hover:underline text-center mt-3"
			>Nie masz jeszcze konta?</a
		>
	</div>
	{#if toast}
		{#if failcode === 1}
			<Toast status={'Failed'} name={'Podany użytkownik nie istnieje'} />
		{/if}
		{#if failcode === 2}
			<Toast status={'Failed'} name={'Podane hasło jest nie poprawne'} />
		{/if}
	{/if}
</section>
