<script lang="ts">
	import { base } from '$app/paths';
	import { gameStore } from '$lib/stores/game';
	import { availableSituations } from '$lib/data/situations';
	import { onMount } from 'svelte';
	import {
		Play,
		Trophy,
		Award,
		User,
		RotateCcw,
		Settings,
		Smartphone,
		WifiOff
	} from 'lucide-svelte';

	let showInstallPrompt = $state(false);
	let deferredPrompt: any = null;

	// Suscribirse manualmente a los stores (Svelte 5 runes no funciona bien con derived)
	let rankData = $state({
		rank: 'practicante',
		name: 'Practicante',
		level: 1,
		pointsToNext: 500,
		totalPoints: 0
	});
	let userPoints = $state(0);
	let userBadges = $state<any[]>([]);

	// Suscribirse al gameStore
	gameStore.subscribe((state) => {
		rankData = state.rank;
		userPoints = state.points;
		userBadges = state.badges.filter((b: any) => b.unlocked);
	});

	onMount(() => {
		// Detectar si es instalable
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			deferredPrompt = e;
			showInstallPrompt = true;
		});

		window.addEventListener('appinstalled', () => {
			showInstallPrompt = false;
			deferredPrompt = null;
		});
	});

	function resetProgress() {
		if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso?')) {
			gameStore.reset();
		}
	}
</script>

<svelte:head>
	<title>Código Cero - Entrenamiento en emergencias</title>
	<meta name="description" content="Entrenamiento gamificado en situaciones de emergencia" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500">
	<!-- Hero Section -->
	<header class="pt-12 pb-8 px-4">
		<div class="max-w-4xl mx-auto text-center text-white">
			<div class="flex justify-center mb-4">
				<div class="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
					<span class="text-6xl">🚨</span>
				</div>
			</div>
			<h1 class="text-4xl md:text-5xl font-bold mb-2">Código Cero</h1>
			<p class="text-xl text-red-100 mb-6">Entrenamiento en emergencias</p>

			<!-- Rango actual -->
			<div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6 inline-block">
				<div class="flex items-center gap-3">
					<User size={24} />
					<div class="text-left">
						<p class="text-sm text-red-200">Tu rango</p>
						<p class="font-bold text-lg">{rankData.name}</p>
					</div>
					<div class="ml-4 text-left">
						<p class="text-sm text-red-200">Nivel {rankData.level}</p>
						<p class="font-bold text-lg">{userPoints} pts</p>
					</div>
				</div>
			</div>

			<!-- Prompt de instalación -->
			{#if showInstallPrompt}
				<button
					onclick={async () => {
						if (deferredPrompt) {
							deferredPrompt.prompt();
							const { outcome } = await deferredPrompt.userChoice;
							if (outcome === 'accepted') {
								showInstallPrompt = false;
							}
							deferredPrompt = null;
						}
					}}
					class="mb-6 bg-white text-red-600 font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 mx-auto hover:bg-red-50 transition-colors"
				>
					<Smartphone size={20} />
					<span>Instalar App</span>
				</button>
			{/if}

			<!-- PWA indicator -->
			{#if !showInstallPrompt && navigator.serviceWorker}
				<div
					class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm"
				>
					<WifiOff size={16} />
					<span>Disponible offline</span>
				</div>
			{/if}
		</div>
	</header>

	<!-- Main Content -->
	<main class="px-4 pb-8">
		<div class="max-w-4xl mx-auto">
			<!-- Insignias -->
			{#if userBadges.length > 0}
				<section class="mb-8">
					<h2 class="text-white font-bold text-xl mb-4 flex items-center gap-2">
						<Award size={24} />
						Insignias
					</h2>
					<div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
						{#each userBadges as badge}
							<div
								class="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center text-white hover:bg-white/30 transition-colors"
								title="{badge.name}: {badge.description}"
							>
								<div class="text-3xl mb-1">{badge.icon}</div>
								<p class="text-xs font-medium truncate">{badge.name}</p>
							</div>
						{/each}
					</div>
				</section>
			{/if}

				<!-- Sistema de puntuación -->
				<section class="mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
					<h3 class="text-white font-bold text-lg mb-3 flex items-center gap-2">
						<Trophy size={18} />
						Sistema de Puntuación
					</h3>
					<div class="grid grid-cols-3 gap-4 text-white text-sm">
						<div class="bg-white/20 rounded-lg p-3">
							<p class="font-bold text-orange-300">✅ Correcta</p>
							<p class="text-xs">+100 pts</p>
						</div>
						<div class="bg-white/20 rounded-lg p-3">
							<p class="font-bold text-green-300">⚡ Rápido</p>
							<p class="text-xs">+50 pts bonus</p>
						</div>
						<div class="bg-white/20 rounded-lg p-3">
							<p class="font-bold text-red-300">❌ Error</p>
							<p class="text-xs">-1 intento</p>
						</div>
					</div>
				</section>
			<!-- Situaciones disponibles -->
			<section class="mb-8">
				<h2 class="text-white font-bold text-xl mb-4 flex items-center gap-2">
					<Play size={24} />
					Situaciones de Entrenamiento
				</h2>
				<div class="space-y-4">
					{#each availableSituations as situation}
						<a
							href="{base}/juego/{situation.id}"
							class="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
						>
							<!-- Imagen de la situación -->
							{#if situation.image}
								<img
									src={base + situation.image}
									alt={situation.title}
									class="w-full"
									style="aspect-ratio: 4/3; object-fit: contain; background-color: #f3f4f6;"
								/>
							{/if}
							<div class="p-3 flex items-start gap-3">
								<div
									class="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
								>
									{situation.icon}
								</div>
								<div class="flex-1">
									<h3 class="truncate font-bold text-base text-gray-800 ">{situation.title}</h3>
									<p class="truncate text-xs ">{situation.description}</p>
									</div>
								<div
									class="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white flex-shrink-0"
								>
									<Play size={18} fill="white" />
								</div>
							</div>
						</a>
					{/each}
				</div>
			</section>

			<!-- Acciones adicionales -->
			<section class="grid grid-cols-2 gap-4">
				<button
					onclick={resetProgress}
					class="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
				>
					<RotateCcw size={20} />
					<span>Reiniciar</span>
				</button>
				<a
					href="{base}/ajustes"
					class="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
				>
					<Settings size={20} />
					<span>Ajustes</span>
				</a>
			</section>

			<!-- Footer -->
			<footer class="mt-8 text-center text-white/70 text-sm">
				<p>Entrenamiento en primeros auxilios - No sustituye formación oficial</p>
				<p class="mt-1">En caso de emergencia real, llama al 112</p>
t			<p class="mt-2 font-medium">Ideador y asesor: Fran Andrés Luis</p>
				<p class="text-xs">Desarollado por Appstracto</p>
			</footer>
		</div>
	</main>
</div>

<style>
	@media (max-width: 640px) {
		h1 {
			font-size: 2rem;
		}
	}
</style>
