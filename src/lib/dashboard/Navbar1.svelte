<script lang="ts" context="module">
</script>

<script lang="ts">
	import current from '$lib/dashboard/Breadcrumb';

	const changeCurrent = (name: string) => {
		current.set(name);
	};

	export let user: string;

	const logOff = () => {
		document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		setTimeout(() => {}, 500);
	};
</script>

<nav class="w-1/5 h-full bg-slate-800 px-4 flex flex-col ">
	<div class="flex flex-row text-white font-bold text-5xl justify-center my-6 items-center gap-2">
		<i class="fa-solid fa-dumbbell" />
		<h1>FitBud</h1>
	</div>
	<div
		class="flex flex-row justify-center mb-4 bg-gray-700 p-2 rounded-lg outline-none text-white items-center"
	>
		<i class="fa-solid fa-magnifying-glass text-xl ml-2 mr-1" />
		<input
			type="search"
			placeholder="Wyszukaj"
			class="bg-gray-700 p-2 rounded-lg outline-none text-white "
		/>
	</div>
	<div class="border border-gray-700 w-full" />
	<div class="flex flex-col items-center justify-between h-full">
		<ul class="mt-4 flex flex-col  gap-4 w-full">
			<li
				class="text-white text-xl w-full p-4 rounded-lg transition-colors"
				class:current={$current == ''}
			>
				<i class="fa-solid fa-house mr-1" />
				<a
					href="/dashboard"
					on:click={() => {
						changeCurrent('');
					}}>Strona główna</a
				>
			</li>
			<li
				class="text-white text-xl w-full p-4 rounded-lg transition-colors"
				class:current={$current == 'Plany treningowe'}
			>
				<i class="fa-solid fa-clipboard-list mr-1" />
				<a
					href="/dashboard/workout-plans"
					on:click={() => {
						changeCurrent('Plany treningowe');
					}}>Plany treningowe</a
				>
			</li>
			<li
				class="text-white text-xl w-full p-4 rounded-lg transition-colors"
				class:current={$current == 'Plany dietetyczne'}
			>
				<i class="fa-solid fa-apple-whole mr-1" />
				<a
					href="/dashboard/diet-plans"
					on:click={() => {
						changeCurrent('Plany dietetyczne');
					}}>Plany dietetyczne</a
				>
			</li>
			<li
				class="text-white text-xl w-full p-4 rounded-lg transition-colors "
				class:current={$current == 'Śledzenie nawyków'}
			>
				<i class="fa-solid fa-calendar mr-1" />
				<a
					href="/dashboard/habit-tracker"
					on:click={() => {
						changeCurrent('Śledzenie nawyków');
					}}>Śledzenie nawyków</a
				>
			</li>
			<div class="border border-gray-700 w-full" />
			<li
				class="text-white text-xl p-4 rounded-lg transition-colors"
				class:current={$current == 'Ustawienia'}
			>
				<i class="fa-solid fa-gear mr-1" />
				<a
					href="/dashboard/settings"
					on:click={() => {
						changeCurrent('Ustawienia');
					}}>Ustawienia</a
				>
			</li>
			<li class="text-white text-xl p-4 rounded-lg transition-colors">
				<i class="fa-solid fa-right-to-bracket mr-1" />
				<a href="/" on:click={logOff}>Wyloguj się</a>
			</li>
		</ul>
		<ul class="mb-4 flex flex-col w-full">
			<li
				class="text-white text-xl p-4 rounded-lg transition-colors"
				class:current={$current == user}
			>
				<a
					href="/dashboard/user"
					on:click={() => {
						changeCurrent(user);
					}}>{user}</a
				>
			</li>
		</ul>
	</div>
</nav>
