<script lang="ts" context="module">
</script>

<script lang="ts">
	import current from '$lib/dashboard/Breadcrumb';

	const changeCurrent = (name: string) => {
		current.set(name);
	};
</script>

<nav class="w-[20%] h-screen bg-blue-600 p-4">
	<div class="flex flex-row items-center gap-2 justify-center">
		<h1 class="text-white font-bold text-2xl mt-4 mb-10 text-center">Aplikacja</h1>
	</div>
	<div class="border-2 border-white rounded mb-6" />
	<div
		class="border rounded-lg bg-white p-2 w-full text-blue-600 font-bold text-xl flex flex-row text-center items-center justify-center mb-6"
	>
		<i class="fa-solid fa-house text-blue-600 text-xl mr-2" />
		<a
			href="/dashboard"
			on:click={() => {
				changeCurrent('');
			}}
		>
			Panel główny
		</a>
	</div>
	<div class="border-2 border-white rounded mb-8" />
	<ul class="text-white font-bold text-xl flex flex-col items-center text-center gap-4">
		<li>
			<a
				href="/dashboard/posts"
				on:click={() => {
					changeCurrent('Artykuły');
				}}
			>
				Artykuły
			</a>
		</li>
		<li>
			<a
				href="/dashboard/add"
				on:click={() => {
					changeCurrent('Dodaj artykuł');
				}}
			>
				Dodaj artykuł
			</a>
		</li>
		<li>
			<a
				href="/dashboard/settings"
				on:click={() => {
					changeCurrent('Ustawienia');
				}}
			>
				Ustawienia
			</a>
		</li>
	</ul>
	<div class="border-2 border-white rounded mt-8" />
</nav>
