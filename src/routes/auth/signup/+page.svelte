<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	import Toast from '$lib/Toast.svelte';
	import { error } from '@sveltejs/kit';
</script>

<script lang="ts">
	// site action variables
	let toast = false;
	let failcode: number;
	let loading = false;

	// side data

	let user = {
		login: '',
		password: ''
	};

	let passwordCheck: string;

	let errors = {
		email: false,
		emailEmpty: false,
		passwordEmpty: false,
		passwordMatch: false,
		passwordWrong: false
	};

	const showToast = () => {
		toast = true;
		setTimeout(() => {
			toast = false;
		}, 2000);
	};

	const validatePass = () => {
		const pascheck = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
		if (!user.password.match(pascheck)) {
			return false;
		}
		return true;
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

	const passwordMatch = () => {
		if (passwordCheck !== user.password) {
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

		if (validatePass()) {
			errors.passwordWrong = false;
		}

		if (passwordMatch()) {
			errors.passwordMatch = false;
		}
	}

	const send = () => {
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

		if (!validateEmail() || !validatePass()) {
			if (!validateEmail()) {
				errors.email = true;
				loading = false;
			}
			if (!validatePass()) {
				errors.passwordWrong = true;
				loading = false;
			}

			return;
		}

		if (!passwordMatch()) {
			errors.passwordMatch = true;
			loading = false;
			return;
		}

		fetch(`http://${location.hostname}:5123/signup`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.status == 400) {
				showToast();
			} else {
				goto('/auth/login');
			}
		});
	};
</script>

<svelte:head>
	<title>Zaloguj się do aplikacji</title>
</svelte:head>

<section class="min-h-screen background-signup w-full flex justify-between">
	<div class="shadow-lg w-1/3 p-10 bg-white flex flex-col justify-center">
		<div class="mb-12">
			<h1 class="text-4xl text-center font-bold mb-1">Witaj w aplikacji!</h1>
			<h2 class="text-xl text-center">Proszę zarejestruj się</h2>
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
					class:input-error={errors.passwordWrong == true}
					bind:value={user.password}
					placeholder="examplE123!"
					id="password"
				/>
				{#if errors.passwordEmpty == true}
					<p class="text-sm text-red-600 mt-1">Prosze wpisać hasło</p>
				{/if}
				{#if errors.passwordWrong == true}
					<p class="text-sm text-red-600 mt-1">Hasło nie spełnia wymagań bezpieczeństwa</p>
				{/if}
			</div>
			<div class="flex flex-col">
				<label for="password" class="mb-1 text-[1rem] text-gray-600"
					><span> Powtórz hasło </span></label
				>
				<input
					type="password"
					class:input={errors.passwordEmpty == false}
					class:input-empty={errors.passwordEmpty == true}
					class:input-error={errors.passwordMatch}
					bind:value={passwordCheck}
					placeholder="examplE123!"
					id="password"
				/>
				{#if errors.passwordEmpty == true}
					<p class="text-sm text-red-600 mt-1">Prosze wpisać hasło</p>
				{/if}
				{#if errors.passwordMatch == true}
					<p class="text-sm text-red-600 mt-1">Hasła się nie zgadzają</p>
				{/if}
			</div>
		</div>

		<div class="flex flex-row justify-center mt-2">
			{#if !loading}
				<button on:click={send} class="button w-full button-success ">Zarejestruj się</button>
			{/if}

			{#if loading}
				<button class="button button-success ">
					<i class="fa-solid fa-gear animate-spin font-bold text-lg text-white " />
				</button>
			{/if}
		</div>

		<a href="/auth/login" class="text-sm text-gray-500 hover:underline text-center mt-3"
			>Masz już konto?</a
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
