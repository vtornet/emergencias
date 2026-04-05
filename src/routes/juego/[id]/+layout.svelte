<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import { ArrowLeft } from 'lucide-svelte';

	let { children } = $props();
	let showingExitModal = $state(false);

	function exitGame() {
		showingExitModal = true;
	}

	function confirmExit() {
		gameStore.updateGameState('menu');
		window.location.href = '/';
	}

	function cancelExit() {
		showingExitModal = false;
	}
</script>

<div class="fixed top-0 left-0 right-0 z-20 bg-red-600 text-white">
	<div class="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
		<button
			onclick={exitGame}
			class="flex items-center gap-2 text-red-200 hover:text-white transition-colors"
		>
			<ArrowLeft size={20} />
			<span class="text-sm font-medium">Salir</span>
		</button>
	</div>
</div>

<!-- Modal de confirmación de salida -->
{#if showingExitModal}
	<div
		class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
		onclick={cancelExit}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Escape' && cancelExit()}
		aria-label="Cerrar modal"
	>
		<div
			class="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
		>
			<h2 class="text-xl font-bold text-gray-800 mb-2">¿Abandonar la misión?</h2>
			<p class="text-gray-600 mb-6">
				Si sales ahora, perderás el progreso de esta situación. ¿Estás seguro?
			</p>
			<div class="flex gap-3">
				<button
					onclick={cancelExit}
					class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-xl transition-colors"
				>
					Continuar jugando
				</button>
				<button
					onclick={confirmExit}
					class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
				>
					Salir
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Espacio para el header fijo del juego -->
<div class="h-14"></div>

{@render children()}
