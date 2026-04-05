<script lang="ts">
	import { base } from '$app/paths';
	import { gameStore } from '$lib/stores/game';
	import { situationsMap, availableSituations } from '$lib/data/situations';
	import Game from '$lib/components/Game.svelte';
	import { onMount } from 'svelte';

	let situationId = $state('');
	let gameStarted = $state(false);
	let error = $state('');

	onMount(() => {
		// Obtener el ID de la URL
		const pathParts = window.location.pathname.split('/');
		situationId = pathParts[pathParts.length - 1];

		// Encontrar la situación
		const situationConfig = availableSituations.find((s) => s.id === situationId);

		if (!situationConfig) {
			error = 'Situación no encontrada';
			return;
		}

		// Cargar la primera situación de la cadena
		const firstSituation = situationsMap.get(situationConfig.firstSituation);

		if (!firstSituation) {
			error = 'Error cargando la situación';
			return;
		}

		// Iniciar el juego
		gameStore.startGame(firstSituation);
		gameStarted = true;
	});
</script>

<svelte:head>
	<title>Jugando - Emergencias</title>
</svelte:head>

{#if error}
	<div class="min-h-screen bg-red-50 flex items-center justify-center p-4">
		<div class="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
			<div class="text-6xl mb-4">😕</div>
			<h1 class="text-2xl font-bold text-gray-800 mb-2">Algo salió mal</h1>
			<p class="text-gray-600 mb-6">{error}</p>
			<a
				href="{base}/"
				class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
			>
				Volver al inicio
			</a>
		</div>
	</div>
{:else if gameStarted}
	<Game />
{:else}
	<div class="min-h-screen bg-red-50 flex items-center justify-center">
		<div class="text-center">
			<div class="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
			<p class="text-gray-600">Cargando situación...</p>
		</div>
	</div>
{/if}
