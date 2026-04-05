<script lang="ts">
	import { base } from '$app/paths';
	import { distractionStore } from '$lib/stores/distractions';
	import { gameStore } from '$lib/stores/game';
	import { onDestroy } from 'svelte';
	import { ArrowLeft, Save, Bell, Phone, MessageSquare, Shield, Zap } from 'lucide-svelte';

	let settings = $state({
		notifications: true,
		calls: true,
		modals: true,
		difficulty: 'normal' as 'easy' | 'normal' | 'hard'
	});

	let storeEnabled = $state(true);

	// Suscribirse a los stores
	const unsubscribeDistraction = distractionStore.subscribe((state: any) => {
		settings = { ...state.settings };
		storeEnabled = state.enabled;
	});

	// Cleanup
	onDestroy(() => {
		unsubscribeDistraction();
	});

	function saveSettings() {
		distractionStore.updateSettings(settings);
		alert('Configuración guardada');
	}

	function resetProgress() {
		if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
			gameStore.reset();
			distractionStore.enable();
		}
	}

	function testDistraction(type: 'notification' | 'call' | 'modal') {
		if (type === 'notification') {
			distractionStore.show({
				id: 'test-' + Date.now(),
				type: 'notification',
				title: '¡Prueba!',
				message: 'Esta es una notificación de prueba',
				app: 'whatsapp',
				duration: 5000,
				points: 0,
				canDismiss: true
			});
		} else if (type === 'call') {
			distractionStore.show({
				id: 'test-' + Date.now(),
				type: 'call',
				title: 'Prueba',
				message: 'Esta es una llamada de prueba',
				caller: 'Test',
				duration: 8000,
				points: 0,
				canDismiss: false
			});
		} else if (type === 'modal') {
			distractionStore.show({
				id: 'test-' + Date.now(),
				type: 'modal',
				title: 'Distracción de prueba',
				message: 'Este es un modal de prueba para ver cómo funciona',
				duration: 4000,
				points: 0,
				canDismiss: true
			});
		}
	}
</script>

<svelte:head>
	<title>Ajustes - Emergencias</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
	<!-- Header -->
	<header class="bg-white dark:bg-gray-800 shadow-sm">
		<div class="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
			<a href="{base}/" class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900">
				<ArrowLeft size={20} />
			</a>
			<h1 class="text-xl font-bold text-gray-800 dark:text-white">Ajustes</h1>
		</div>
	</header>

	<main class="max-w-2xl mx-auto p-4 py-8">
		<!-- Distracciones -->
		<section class="mb-8">
			<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">
				<h2 class="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
					<Shield size={20} />
					Distracciones del Sistema
				</h2>
				<p class="text-gray-600 dark:text-gray-400 text-sm mb-6">
					Las distracciones simulan notificaciones y llamadas para entrenar la capacidad de concentración bajo
					presión. Desactívalos si te resultan molestas.
				</p>

				<!-- Toggle de activación -->
				<div class="flex items-center justify-between mb-6">
					<div>
						<p class="font-medium text-gray-700 dark:text-gray-300">Distracciones activadas</p>
						<p class="text-sm text-gray-500 dark:text-gray-400">
							{storeEnabled ? 'Activadas' : 'Desactivadas'}
						</p>
					</div>
					<button
						onclick={() => storeEnabled ? distractionStore.disable() : distractionStore.enable()}
						class="px-4 py-2 rounded-lg text-sm font-medium {storeEnabled
							? 'bg-red-100 text-red-700 hover:bg-red-200'
							: 'bg-green-100 text-green-700 hover:bg-green-200'}"
					>
						{storeEnabled ? 'Desactivar' : 'Activar'}
					</button>
				</div>

				<!-- Tipos de distracciones -->
				<div class="space-y-4">
					<div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
								<MessageSquare size={20} class="text-blue-600 dark:text-blue-400" />
							</div>
							<div>
								<p class="font-medium text-gray-700 dark:text-gray-300">Notificaciones simuladas</p>
								<p class="text-sm text-gray-500 dark:text-gray-400">WhatsApp, Instagram, Telegram...</p>
							</div>
						</div>
						<label class="relative inline-flex h-6 w-11 cursor-pointer">
							<input
								type="checkbox"
								bind:checked={settings.notifications}
								class="sr-only peer"
							/>
							<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] peer-focus:ring-2 peer-focus:ring-blue-300 transition-all">
								<div class="after:content-[''] absolute left-0 top-0.5 h-5 w-5 bg-white rounded-full shadow-sm peer-checked:after:bg-white"></div>
							</div>
						</label>
					</div>

					<div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
								<Phone size={20} class="text-green-600 dark:text-green-400" />
							</div>
							<div>
								<p class="font-medium text-gray-700 dark:text-gray-300">Llamadas entrantes</p>
								<p class="text-sm text-gray-500 dark:text-gray-400">Simula llamada que requiere respuesta</p>
							</div>
						</div>
						<label class="relative inline-flex h-6 w-11 cursor-pointer">
							<input
								type="checkbox"
								bind:checked={settings.calls}
								class="sr-only peer"
							/>
							<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-green-600 peer-checked:after:translate-x-full after:content[''] peer-focus:ring-2 peer-focus:ring-green-300 transition-all">
								<div class="after:content-[''] absolute left-0 top-0.5 h-5 w-5 bg-white rounded-full shadow-sm peer-checked:after:bg-white"></div>
							</div>
						</label>
					</div>

					<div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
								<Bell size={20} class="text-orange-600 dark:text-orange-400" />
							</div>
							<div>
								<p class="font-medium text-gray-700 dark:text-gray-300">Modales emergentes</p>
								<p class="text-sm text-gray-500 dark:text-gray-400">Requieren cierre manual</p>
							</div>
						</div>
						<label class="relative inline-flex h-6 w-11 cursor-pointer">
							<input
								type="checkbox"
								bind:checked={settings.modals}
								class="sr-only peer"
							/>
							<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-orange-600 peer-checked:after:translate-x-full after:content-[''] peer-focus:ring-2 peer-focus:ring-orange-300 transition-all">
								<div class="after:content-[''] absolute left-0 top-0.5 h-5 w-5 bg-white rounded-full shadow-sm peer-checked:after:bg-white"></div>
							</div>
						</label>
					</div>
				</div>

				<!-- Nivel de dificultad -->
				<div class="mt-6">
					<p class="font-medium text-gray-700 dark:text-gray-300 mb-3">Frecuencia de distracciones</p>
					<div class="grid grid-cols-3 gap-2">
						<button
							onclick={() => { settings.difficulty = 'easy'; saveSettings(); }}
							class="px-4 py-2 rounded-lg text-sm font-medium {settings.difficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
						>
							Baja
						</button>
						<button
							onclick={() => { settings.difficulty = 'normal'; saveSettings(); }}
							class="px-4 py-2 rounded-lg text-sm font-medium {settings.difficulty === 'normal' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
						>
							Normal
						</button>
						<button
							onclick={() => { settings.difficulty = 'hard'; saveSettings(); }}
							class="px-4 py-2 rounded-lg text-sm font-medium {settings.difficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
						>
							Alta
						</button>
					</div>
				</div>
			</div>
		</section>

		<!-- Pruebas -->
		<section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">
			<h2 class="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
				<Zap size={20} />
				Probar Distracciones
			</h2>
			<p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
				Prueba cómo funcionan las distracciones antes de jugar una partida real.
			</p>
			<div class="grid grid-cols-3 gap-3">
				<button
					onclick={() => testDistraction('notification')}
					class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2"
				>
					<MessageSquare size={18} />
					<span>Notificación</span>
				</button>
				<button
					onclick={() => testDistraction('call')}
					class="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2"
				>
					<Phone size={18} />
					<span>Llamada</span>
				</button>
				<button
					onclick={() => testDistraction('modal')}
					class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2"
				>
					<Bell size={18} />
					<span>Modal</span>
				</button>
			</div>
		</section>

		<!-- Reset -->
		<section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">
			<h2 class="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
				<Shield size={20} />
				Datos del Juego
			</h2>
			<p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
				Esto reiniciará todo tu progreso. Piénsalo antes de hacerlo.
			</p>
			<button
				onclick={resetProgress}
				class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2"
			>
				🔄 Reiniciar todo el progreso
			</button>
		</section>

		<!-- Guardar -->
		<div class="flex justify-end">
			<button
				onclick={saveSettings}
				class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2"
			>
				<Save size={18} />
				Guardar cambios
			</button>
		</div>
	</main>
</div>
