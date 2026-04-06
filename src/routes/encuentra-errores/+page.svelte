<script lang="ts">
	import { base } from '$app/paths';
	import { findErrorsGames } from '$lib/data/find-errors';
	import { onDestroy } from 'svelte';
	import { Clock, Eye, CheckCircle, X, Lightbulb, Play, Home, Trophy } from 'lucide-svelte';

	// Estado del juego
	let game = $state(findErrorsGames[0]);
	let timeRemaining = $state(game.timeLimit);
	let foundErrors = $state<number[]>([]);
	let gameOver = $state(false);
	let showResults = $state(false);
	let finalScore = $state(0);
	let hasBonus = $state(false);
	let showingSolution = $state(false);

	// Timer
	let timerInterval: ReturnType<typeof setInterval> | null = null;

	// Iniciar timer
	$effect(() => {
		if (!gameOver && !showResults) {
			startTimer();
		}
		return () => {
			if (timerInterval) clearInterval(timerInterval);
		};
	});

	function startTimer() {
		if (timerInterval) clearInterval(timerInterval);
		timeRemaining = game.timeLimit;

		timerInterval = setInterval(() => {
			timeRemaining--;

			if (timeRemaining <= 0) {
				clearInterval(timerInterval!);
				endGame(false);
			}
		}, 1000);
	}

	// Manejar clic en la imagen
	function handleImageClick(event: MouseEvent) {
		if (gameOver || showResults) return;

		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width) * 100;
		const y = ((event.clientY - rect.top) / rect.height) * 100;

		// Verificar si tocó algún error
		for (const error of game.errores) {
			const distance = Math.sqrt((x - error.x) ** 2 + (y - error.y) ** 2);
			if (distance <= error.radius) {
				// Verificar si ya fue encontrado
				if (!foundErrors.includes(error.id)) {
					foundErrors = [...foundErrors, error.id];

					// Verificar si se encontraron todos
					if (foundErrors.length === game.errores.length) {
						endGame(true);
					}
				}
				break;
			}
		}
	}

	function endGame(completed: boolean) {
		gameOver = true;

		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
		}

		// Calcular puntuación
		const pointsPerError = game.pointsPerError;
		finalScore = foundErrors.length * pointsPerError;

		if (completed) {
			const timeTaken = game.timeLimit - timeRemaining;
			if (timeTaken < 30) {
				finalScore += game.bonusUnder30s;
				hasBonus = true;
			}
		}

		showResults = true;
	}

	function restart() {
		foundErrors = [];
		gameOver = false;
		showResults = false;
		finalScore = 0;
		hasBonus = false;
		timeRemaining = game.timeLimit;
		startTimer();
	}

	function goHome() {
		window.location.href = base + '/';
	}

	function toggleSolution() {
		showingSolution = !showingSolution;
	}

	// Formatear tiempo
	function formatTime(seconds: number) {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<!-- Header -->
	<header class="bg-white shadow-sm sticky top-0 z-10">
		<div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
			<button
				onclick={goHome}
				class="text-gray-600 hover:text-gray-800 flex items-center gap-1"
			>
				<Home size={20} />
			</button>
			<h1 class="text-lg font-bold text-gray-800">{game.title}</h1>
			<div class="flex items-center gap-3">
				{#if !gameOver && !showResults}
					<div class="flex items-center gap-1 {timeRemaining <= 10 ? 'text-red-600' : 'text-gray-600'}">
						<Clock size={18} />
						<span class="font-bold">{formatTime(timeRemaining)}</span>
					</div>
					<div class="flex items-center gap-1 text-gray-600">
						<Eye size={18} />
						<span>{foundErrors.length}/{game.errores.length}</span>
					</div>
				{/if}
			</div>
		</div>
	</header>

	<main class="max-w-4xl mx-auto px-4 py-6">
		<!-- Descripción -->
		<div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
			<p class="text-gray-700 text-lg">{game.description}</p>
			<div class="flex items-center gap-2 mt-4">
				<span class="badge badge-gold">
					{game.difficulty === 'easy' ? 'Fácil' : game.difficulty === 'intermediate' ? 'Medio' : 'Difícil'}
				</span>
				<span class="text-sm text-gray-500">+{game.pointsPerError} pts por error • +{game.bonusUnder30s} pts si terminas en 30s</span>
			</div>
		</div>

		{#if !showResults}
			<!-- Área de juego -->
			<div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
				<!-- Imagen con zonas calientes -->
				<div class="relative cursor-crosshair touch-feedback" onmousedown={handleImageClick}>
					<img
						src="{base}{game.image}"
						alt="Playa con errores"
						class="w-full"
						style="aspect-ratio: 4/3; object-fit: cover;"
					/>

					<!-- Zonas encontradas (se muestran al encontrar) -->
					{#each foundErrors as errorId}
						{@const error = game.errores.find(e => e.id === errorId)}
						{#if error}
							<div
								class="absolute border-4 border-green-500 rounded-full animate-scale-in flex items-center justify-center bg-green-500/20"
								style="left: {error.x}%; top: {error.y}%; width: {error.radius * 2}%; height: {error.radius * 2}%; transform: translate(-50%, -50%);"
							>
							<CheckCircle size={24} class="text-green-600" fill="white" />
						</div>
					{/if}
				{/each}

					<!-- Solución (toggle) -->
					{#if showingSolution}
						<div class="absolute inset-0 pointer-events-none">
							<img
								src="{base}{game.imageWithSolution}"
								alt="Solución"
								class="w-full h-full"
								style="aspect-ratio: 4/3; object-fit: cover;"
							/>
						</div>
					{/if}
				</div>

				<!-- Botón solución -->
				<button
					onclick={toggleSolution}
					class="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 flex items-center justify-center gap-2 border-t"
				>
					<Lightbulb size={18} />
					{showingSolution ? 'Ocultar solución' : 'Ver solución'}
				</button>
			</div>

			<!-- Lista de errores a encontrar -->
			<div class="bg-white rounded-2xl shadow-lg p-6">
				<h3 class="font-bold text-gray-800 mb-4">Errores a encontrar:</h3>
				<div class="space-y-2">
					{#each game.errores as error, index}
						<div
							class="flex items-start gap-3 p-3 rounded-xl transition-all {foundErrors.includes(error.id)
								? 'bg-green-50 border-2 border-green-200'
								: 'bg-gray-50 border-2 border-gray-200'}"
						>
							<div class="flex-shrink-0">
								<span class="flex items-center justify-center w-8 h-8 rounded-full {
									foundErrors.includes(error.id) ? 'bg-green-500' : 'bg-gray-300'} text-white font-bold text-sm">
									{index + 1}
								</span>
							</div>
							<div class="flex-1">
								<p class="font-semibold text-gray-800">{error.nombre}</p>
								{#if foundErrors.includes(error.id)}
									<div class="mt-1">
										<p class="text-sm text-green-700 flex items-center gap-1">
											<CheckCircle size={14} />
											¡Encontrado!
										</p>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<!-- Resultados -->
			<div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
				<!-- Header -->
				<div class="{finalScore > 0 ? 'bg-green-600' : 'bg-red-600'} text-white px-6 py-4">
					<div class="flex items-center gap-3">
						<span class="text-4xl">{finalScore > 0 ? '🎉' : '😔'}</span>
						<div>
							<h2 class="text-xl font-bold">
								{foundErrors.length === game.errores.length ? '¡Excelente!' : 'Tiempo agotado'}
							</h2>
							<p class="{finalScore > 0 ? 'text-green-100' : 'text-red-100'}">
								{finalScore} puntos
							</p>
						</div>
					</div>
				</div>

				<!-- Feedback de cada error -->
				<div class="p-6 space-y-4">
					<h3 class="font-bold text-gray-800 text-lg">Análisis de la situación:</h3>

					{#each game.errores as error}
						<div class="flex items-start gap-3 p-4 rounded-xl {foundErrors.includes(error.id)
							? 'bg-green-50 border-2 border-green-200'
							: 'bg-red-50 border-2 border-red-200'}">
							<div class="flex-shrink-0">
								{#if foundErrors.includes(error.id)}
									<CheckCircle size={24} class="text-green-600" />
								{:else}
									<X size={24} class="text-red-600" />
								{/if}
							</div>
							<div class="flex-1">
								<p class="font-bold text-gray-800 mb-1">{error.nombre}</p>
								<p class="text-sm text-gray-600 mb-2">{error.feedback}</p>
								<p class="text-sm {foundErrors.includes(error.id) ? 'text-green-700' : 'text-red-600'}">
									<strong>Consecuencia:</strong> {error.consecuencia}
								</p>
							</div>
						</div>
					{/each}
				</div>

				<!-- Aprendizaje -->
				<div class="px-6 pb-6">
					<div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
						<h4 class="font-bold text-blue-800 mb-2 flex items-center gap-2">
							<Lightbulb size={18} />
							¿Qué has aprendido?
						</h4>
						<ul class="space-y-1 text-sm text-blue-700">
							{#each game.summary.aprendizaje as punto}
								<li class="flex items-start gap-2">
									<span class="text-blue-500">•</span>
									<span>{punto}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<!-- Bonus -->
				{#if hasBonus}
					<div class="mx-6 mb-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 flex items-center gap-2">
						<Trophy size={20} class="text-yellow-600" />
						<p class="font-bold text-yellow-800">¡Bonus por rapidez! +{game.bonusUnder30s} puntos extra</p>
					</div>
				{/if}

				<!-- Botones -->
				<div class="px-6 pb-6 flex gap-3">
					<button
						onclick={restart}
						class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
					>
						<Play size={18} />
						Jugar de nuevo
					</button>
					<button
						onclick={goHome}
						class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
					>
						<Home size={18} />
						Volver al inicio
					</button>
				</div>
			</div>
		{/if}
	</main>
</div>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: 9999px;
	}

	.badge-gold {
		background: linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%);
		color: #78350F;
	}

	.touch-feedback {
		position: relative;
		overflow: hidden;
	}

	.touch-feedback::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.1);
		transform: translate(-50%, -50%);
		transition: width 0.3s ease, height 0.3s ease;
	}

	.touch-feedback:active::after {
		width: 150px;
		height: 150px;
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
		transform: scale(0.8);
		}
		to {
			opacity: 1;
		transform: scale(1);
		}
	}

	.animate-scale-in {
		animation: scaleIn 0.3s ease-out forwards;
	}
</style>
