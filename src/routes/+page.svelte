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
		WifiOff,
		Zap,
		Target,
		Shield,
		TrendingUp,
		Eye
	} from 'lucide-svelte';

	let showInstallPrompt = $state(false);
	let deferredPrompt: any = null;
	let mounted = $state(false);

	// Suscribirse manualmente a los stores
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
		mounted = true;
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

	// Calcular progreso hacia siguiente rango
	function progressToNextRank() {
		if (!rankData.pointsToNext) return 0;
		const totalForNext = rankData.totalPoints + rankData.pointsToNext;
		return (rankData.totalPoints / totalForNext) * 100;
	}
</script>

<svelte:head>
	<title>Prevengo Tech - Entrenamiento en emergencias sanitarias</title>
	<meta name="description" content="Entrenamiento gamificado en situaciones de emergencia. Aprende a salvar vidas." />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<!-- Hero Section con gradiente profesional -->
	<header class="hero-gradient text-white relative overflow-hidden">
		<!-- Decorative elements -->
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
			<div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
		</div>

		<div class="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
			<!-- Logo -->
			<div class="flex justify-center mb-8 animate-fade-in">
				<img
					src="{base}/images/logo/logo.png"
					alt="Prevengo Tech"
					class="h-48 md:h-64 object-contain drop-shadow-2xl"
				/>
			</div>

			<!-- Stats Cards -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto stagger-children">
				<!-- Rango Card -->
				<div class="glass-dark rounded-2xl p-5 text-center hover:bg-white/15 transition-all duration-300">
					<div class="flex items-center justify-center gap-3 mb-2">
						<User size={22} class="text-red-300" />
						<p class="text-sm text-red-200 font-medium">Tu Rango</p>
					</div>
					<p class="text-2xl md:text-3xl font-bold">{rankData.name}</p>
					<p class="text-sm text-red-200 mt-1">Nivel {rankData.level}</p>
					<!-- Progress bar -->
					<div class="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
						<div
							class="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
							style="width: {progressToNextRank()}%"
						></div>
					</div>
					<p class="text-xs text-red-200 mt-1">{rankData.totalPoints} / {rankData.totalPoints + rankData.pointsToNext} pts</p>
				</div>

				<!-- Puntos Card -->
				<div class="glass-dark rounded-2xl p-5 text-center hover:bg-white/15 transition-all duration-300">
					<div class="flex items-center justify-center gap-3 mb-2">
						<Trophy size={22} class="text-yellow-300" />
						<p class="text-sm text-red-200 font-medium">Puntos</p>
					</div>
					<p class="text-3xl md:text-4xl font-bold">{userPoints}</p>
					<p class="text-sm text-red-200 mt-1">Puntos totales</p>
				</div>

				<!-- Insignias Card -->
				<div class="glass-dark rounded-2xl p-5 text-center hover:bg-white/15 transition-all duration-300">
					<div class="flex items-center justify-center gap-3 mb-2">
						<Award size={22} class="text-purple-300" />
						<p class="text-sm text-red-200 font-medium">Insignias</p>
					</div>
					<p class="text-3xl md:text-4xl font-bold">{userBadges.length}</p>
					<p class="text-sm text-red-200 mt-1">Desbloqueadas</p>
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
					class="mt-6 bg-white text-red-600 font-semibold py-3 px-8 rounded-full shadow-xl flex items-center gap-2 mx-auto hover:bg-red-50 transition-all hover:scale-105 active:scale-95"
				>
					<Smartphone size={20} />
					<span>Instalar Aplicación</span>
				</button>
			{/if}

			<!-- PWA indicator -->
			{#if !showInstallPrompt && navigator.serviceWorker}
				<div class="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
					<WifiOff size={14} />
					<span>Disponible offline</span>
				</div>
			{/if}
		</div>

		<!-- Wave divider -->
		<div class="relative h-16">
			<svg class="absolute bottom-0 w-full h-full text-slate-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
				<path fill="currentColor" d="M0,0 C240,40 480,54 720,54 C960,54 1200,40 1440,0 L1440,54 L0,54 Z"></path>
			</svg>
		</div>
	</header>

	<!-- Main Content -->
	<main class="px-4 pb-12 -mt-8 relative z-10">
		<div class="max-w-6xl mx-auto">

			<!-- Banner de valor -->
			<section class="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-8 animate-fade-in-up">
				<div class="flex flex-col md:flex-row items-center gap-6">
					<div class="flex-1">
						<div class="flex items-center gap-2 mb-2">
							<Shield size={24} class="text-yellow-300" />
							<span class="text-sm font-semibold text-red-200 uppercase tracking-wide">Formación Certificada</span>
						</div>
						<h2 class="text-2xl md:text-3xl font-bold mb-2">Aprende a salvar vidas</h2>
						<p class="text-red-100">Entrenamiento práctico en emergencias sanitarias. Aprende las técnicas que pueden marcar la diferencia entre la vida y la muerte.</p>
					</div>
					<div class="flex gap-4">
						<div class="text-center">
							<div class="text-3xl font-bold">24/7</div>
							<div class="text-xs text-red-200">Disponible</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold">+500</div>
							<div class="text-xs text-red-200">Usuarios</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Insignias -->
			{#if userBadges.length > 0}
				<section class="mb-8 animate-fade-in-up" style="animation-delay: 0.1s">
					<div class="flex items-center gap-3 mb-4">
						<div class="icon-box icon-box-purple">
							<Award size={20} />
						</div>
						<h2 class="text-xl font-bold text-gray-800">Insignias Conseguidas</h2>
					</div>
					<div class="bg-white rounded-2xl shadow-lg p-4 md:p-6">
						<div class="grid grid-cols-3 sm:grid-cols-6 gap-4">
							{#each userBadges as badge}
								<div
									class="group text-center p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-default"
									title="{badge.name}: {badge.description}"
								>
									<div class="text-4xl mb-2 group-hover:scale-110 transition-transform">{badge.icon}</div>
									<p class="text-xs font-semibold text-gray-700 truncate">{badge.name}</p>
								</div>
							{/each}
						</div>
					</div>
				</section>
			{/if}

			<!-- Sistema de puntuación -->
			<section class="mb-8 animate-fade-in-up" style="animation-delay: 0.15s">
				<div class="flex items-center gap-3 mb-4">
					<div class="icon-box icon-box-gold">
						<Trophy size={20} class="text-amber-600" />
					</div>
					<h2 class="text-xl font-bold text-gray-800">Sistema de Puntuación</h2>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div class="card-elevated p-5">
						<div class="flex items-center gap-3 mb-3">
							<div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
								<span class="text-xl">✅</span>
							</div>
							<div>
								<p class="font-bold text-gray-800">Respuesta Correcta</p>
								<p class="text-2xl font-bold text-green-600">+100</p>
							</div>
						</div>
						<p class="text-sm text-gray-500">Pts por decisión acertada</p>
					</div>
					<div class="card-elevated p-5">
						<div class="flex items-center gap-3 mb-3">
							<div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
								<Zap size={20} class="text-amber-600" />
							</div>
							<div>
								<p class="font-bold text-gray-800">Bonus Rapidez</p>
								<p class="text-2xl font-bold text-amber-600">+50</p>
							</div>
						</div>
						<p class="text-sm text-gray-500">Pts si respondes en &lt;10s</p>
					</div>
					<div class="card-elevated p-5">
						<div class="flex items-center gap-3 mb-3">
							<div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
								<Target size={20} class="text-red-600" />
							</div>
							<div>
								<p class="font-bold text-gray-800">Objetivo</p>
								<p class="text-sm font-bold text-gray-600">Salvar vidas</p>
							</div>
						</div>
						<p class="text-sm text-gray-500">Cada decisión cuenta</p>
					</div>
				</div>
			</section>

			<!-- Situaciones de Entrenamiento -->
			<section class="mb-8 animate-fade-in-up" style="animation-delay: 0.2s">
				<div class="flex items-center gap-3 mb-4">
					<div class="icon-box icon-box-red">
						<Play size={20} class="text-red-600" />
					</div>
					<h2 class="text-xl font-bold text-gray-800">Situaciones de Entrenamiento</h2>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each availableSituations as situation, index}
						<a
							href="{base}/juego/{situation.id}"
							class="group card-elevated overflow-hidden touch-feedback"
							style="animation-delay: {0.2 + index * 0.1}s"
						>
							<!-- Imagen de la situación -->
							<div class="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
								{#if situation.image}
									<img
										src={base + situation.image}
										alt={situation.title}
										class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
									/>
								{:else}
									<div class="w-full h-full flex items-center justify-center text-6xl">
										{situation.icon}
									</div>
								{/if}
								<!-- Overlay -->
								<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
								<!-- Difficulty badge -->
								<div class="absolute top-3 right-3">
									<span class="badge {situation.difficulty === 1 ? 'badge-green' : situation.difficulty === 2 ? 'badge-yellow' : 'badge-red'}">
										{#if situation.difficulty === 1}Fácil{:else if situation.difficulty === 2}Medio{:else}Avanzado{/if}
									</span>
								</div>
							</div>
							<!-- Content -->
							<div class="p-5">
								<div class="flex items-start gap-4">
									<div class="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
										{situation.icon}
									</div>
									<div class="flex-1 min-w-0">
										<h3 class="font-bold text-lg text-gray-800 group-hover:text-red-600 transition-colors">{situation.title}</h3>
										<p class="text-sm text-gray-500 line-clamp-2">{situation.description}</p>
									</div>
									<div class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
										<Play size={18} fill="white" />
									</div>
								</div>
							</div>
						</a>
					{/each}
				</div>
			</section>

			<!-- Encuentra los Errores -->
			<section class="mb-8 animate-fade-in-up" style="animation-delay: 0.25s">
				<div class="flex items-center gap-3 mb-4">
					<div class="icon-box icon-box-purple">
						<Eye size={20} class="text-purple-600" />
					</div>
					<h2 class="text-xl font-bold text-gray-800">Encuentra los Errores</h2>
				</div>
				<a
					href="{base}/encuentra-errores"
					class="card-elevated overflow-hidden touch-feedback block"
				>
					<div class="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-50">
						<img
							src="{base}/images/find-errors/find-errors-01.png"
							alt="Encuentra los errores en la playa"
							class="w-full h-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
						<div class="absolute bottom-4 left-4 right-4">
							<span class="badge badge-purple">Novedad</span>
						</div>
					</div>
					<div class="p-5">
						<div class="flex items-start gap-4">
							<div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
								🔍
							</div>
							<div class="flex-1 min-w-0">
								<h3 class="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors">Vigilancia Playa</h3>
								<p class="text-sm text-gray-500">Encuentra los 5 peligros en esta playa concurrida. Tienes 45 segundos.</p>
							</div>
							<div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
								<Play size={18} fill="white" />
							</div>
						</div>
					</div>
				</a>
			</section>

			<!-- Stats Section -->
			<section class="mb-8 animate-fade-in-up" style="animation-delay: 0.3s">
				<div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white">
					<div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
						<div>
							<div class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
								{availableSituations.length}
							</div>
							<p class="text-sm text-slate-400 mt-1">Escenarios</p>
						</div>
						<div>
							<div class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
								{userBadges.length}
							</div>
							<p class="text-sm text-slate-400 mt-1">Insignias</p>
						</div>
						<div>
							<div class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
								{rankData.level}
							</div>
							<p class="text-sm text-slate-400 mt-1">Nivel actual</p>
						</div>
						<div>
							<div class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
								{userPoints}
							</div>
							<p class="text-sm text-slate-400 mt-1">Puntos</p>
						</div>
					</div>
				</div>
			</section>

			<!-- Acciones -->
			<section class="grid grid-cols-2 gap-4 animate-fade-in-up" style="animation-delay: 0.35s">
				<button
					onclick={resetProgress}
					class="group bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 font-semibold py-4 px-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 touch-feedback"
				>
					<RotateCcw size={20} class="group-hover:rotate-180 transition-transform duration-500" />
					<span>Reiniciar Progreso</span>
				</button>
				<a
					href="{base}/ajustes"
					class="group bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-semibold py-4 px-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 touch-feedback"
				>
					<Settings size={20} class="group-hover:rotate-90 transition-transform duration-500" />
					<span>Ajustes</span>
				</a>
			</section>

			<!-- Footer profesional -->
			<footer class="mt-12 pt-8 border-t border-gray-200">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					<div>
						<h4 class="font-bold text-gray-800 mb-3">Prevengo Tech</h4>
						<p class="text-sm text-gray-500">Plataforma de entrenamiento en emergencias sanitarias. Aprende, practica, salva vidas.</p>
					</div>
					<div>
						<h4 class="font-bold text-gray-800 mb-3">Legal</h4>
						<ul class="space-y-2 text-sm text-gray-500">
							<li><a href="#" class="hover:text-red-600 transition-colors">Términos de uso</a></li>
							<li><a href="#" class="hover:text-red-600 transition-colors">Privacidad</a></li>
							<li><a href="#" class="hover:text-red-600 transition-colors">Cookies</a></li>
						</ul>
					</div>
					<div>
						<h4 class="font-bold text-gray-800 mb-3">Contacto</h4>
						<p class="text-sm text-gray-500 mb-2">¿Necesitas ayuda?</p>
						<a href="mailto:info@prevengotech.com" class="text-sm text-red-600 hover:text-red-700 font-medium">info@prevengotech.com</a>
					</div>
				</div>

				<div class="divider mb-6"></div>

				<div class="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
					<div class="text-center md:text-left mb-4 md:mb-0">
						<p>© 2026 Prevengo Tech. Todos los derechos reservados.</p>
						<p class="text-xs text-gray-400 mt-1">El entrenamiento no sustituye formación oficial. En emergencia real, llama al 112.</p>
					</div>
					<div class="text-center md:text-right">
						<p class="font-medium text-gray-700">Ideador y asesor: Francisco Javier Andrés Luis</p>
						<p class="text-xs text-gray-400">Desarrollado por Appstracto</p>
					</div>
				</div>
			</footer>
		</div>
	</main>
</div>

<style>
	/* Icon boxes personalizados */
	.icon-box-purple {
		background: linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%);
		color: #7C3AED;
	}
	.icon-box-gold {
		background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
		color: #D97706;
	}

	/* Badges */
	.badge-green {
		background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
		color: #065F46;
	}
	.badge-yellow {
		background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
		color: #92400E;
	}
	.badge-red {
		background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
		color: #991B1B;
	}
	.badge-purple {
		background: linear-gradient(135deg, #E9D5FF 0%, #C4B5FD 100%);
		color: #5B21B6;
	}

	/* Line clamp */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Mobile adjustments */
	@media (max-width: 640px) {
		.hero-gradient {
			padding-top: 2rem;
			padding-bottom: 2rem;
		}
	}
</style>
