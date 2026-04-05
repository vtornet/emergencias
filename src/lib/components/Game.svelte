<script lang="ts">
	import { base } from '$app/paths';
	import { gameStore } from '$lib/stores/game';
	import { distractionStore } from '$lib/stores/distractions';
	import { situationsMap } from '$lib/data/situations';
	import { onDestroy } from 'svelte';
	import { Heart, Clock, Trophy, AlertCircle, AlertTriangle } from 'lucide-svelte';

	// Estado reactivo - suscribirse a los stores manualmente
	let currentSituation: any = $state(null);
	let hearts = $state(3);
	let points = $state(0);
	let gameState = $state('menu');
	let distractionEnabled = $state(true);
	let attemptsRemaining = $state(3);

	// Suscribirse a los stores
	const unsubscribeGame = gameStore.subscribe((state) => {
		currentSituation = state.currentSituation;
		hearts = state.hearts;
		points = state.points;
		gameState = state.currentState;
		attemptsRemaining = state.attemptsRemaining;
	});

	const unsubscribeDistraction = distractionStore.subscribe((state) => {
		distractionEnabled = state.enabled;
	});

	// Cleanup
	onDestroy(() => {
		unsubscribeGame();
		unsubscribeDistraction();
	});

	// Estado local
	let timeRemaining = $state(0);
	let timerInterval: ReturnType<typeof setInterval> | null = null;
	let showFeedback = $state(false);
	let tipVisible = $state(false);
	let tipCost = $state(0);
	let shuffledOptions = $state<any[]>([]);
	let feedbackData = $state<{
		correct: boolean;
		feedback: string;
		points: number;
		timeBonus: number;
		totalPoints: number;
		nextSituation?: string;
		gameOver: boolean;
		repeat: boolean;
		attemptsRemaining: number;
	} | null>(null);

	// Función para mezclar array (Fisher-Yates)
	function shuffle<T>(array: T[]): T[] {
		const arr = [...array];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	function useTip() {
		if (!currentSituation?.tip) return;

		const cost = currentSituation.tip.cost;
		tipCost = cost;
		tipVisible = true;

		// Descontar puntos usando el método del store
		gameStore.useTip(cost);
	}

	// Iniciar timer cuando hay situación
	$effect(() => {
		if (currentSituation && !showFeedback) {
			// Mezclar opciones aleatoriamente cada vez que cambia la situación
			shuffledOptions = shuffle(currentSituation.options);
			startTimer();
		}
		return () => {
			if (timerInterval) {
				clearInterval(timerInterval);
				timerInterval = null;
			}
		};
	});

	function startTimer() {
		if (!currentSituation || currentSituation.timeLimit === 0) return;

		if (timerInterval) clearInterval(timerInterval);

		timeRemaining = currentSituation.timeLimit;

		timerInterval = setInterval(() => {
			timeRemaining--;

			// Mostrar distracciones aleatorias
			if (distractionEnabled && Math.random() < 0.05) {
				showRandomDistraction();
			}

			if (timeRemaining <= 0) {
				clearInterval(timerInterval!);
				timerInterval = null;
				handleTimeout();
			}
		}, 1000);
	}

	function handleTimeout() {
		// Tiempo agotado - cuenta como incorrecto
		const result = gameStore.makeDecision('', timeRemaining);
		showFeedbackModal(result);
	}

	function makeDecision(optionId: string) {
		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
		}

		const timeTaken = currentSituation!.timeLimit - timeRemaining;
		const result = gameStore.makeDecision(optionId, timeTaken);
		showFeedbackModal(result);
	}

	function showFeedbackModal(result: any) {
		feedbackData = result;
		showFeedback = true;
	}

	function continueAfterFeedback() {
		showFeedback = false;

		if (feedbackData?.gameOver) {
			// Game over - se acabaron los intentos
			gameStore.updateGameState('gameover');
		} else if (feedbackData?.correct && feedbackData.nextSituation) {
			// Respuesta correcta - hay siguiente situación en la cadena
			const next = situationsMap.get(feedbackData.nextSituation);
			if (next) {
				// Actualizar la situación actual en el store
				gameStore.update((state) => ({
					...state,
					currentSituation: next
				}));
				// Forzar actualización local para que el $effect se dispare
				currentSituation = next;
			}
		} else if (feedbackData?.correct) {
			// Respuesta correcta - No hay más situaciones, VICTORIA
			gameStore.updateGameState('victory');
		} else if (feedbackData?.repeat) {
			// Respuesta incorrecta pero tiene más intentos
			// Volver a mostrar las mismas opciones
			timeRemaining = currentSituation!.timeLimit;
			startTimer();
		}
	}

	function showRandomDistraction() {
		distractionStore.showRandom((result) => {
			console.log('Distraction result:', result);
		});
	}

	function goHome() {
		window.location.href = base + '/';
	}

	function restart() {
		const situation = currentSituation;
		if (situation) {
			const firstId = situation.id.split('-')[0] + '-1';
			const first = situationsMap.get(firstId);
			if (first) {
				gameStore.reset();
				distractionStore.enable(); // Asegurar que las distracciones estén activadas
				gameStore.startGame(first);
				showFeedback = false;
				timeRemaining = first.timeLimit;
				startTimer();
			}
		}
	}
</script>

{#if gameState === 'gameover' || gameState === 'victory'}
	<!-- Pantalla de resultados -->
	<div class="min-h-screen {gameState === 'victory' ? 'bg-green-50' : 'bg-red-50'} flex items-center justify-center p-4">
		<div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
			<div class="text-8xl mb-4">{gameState === 'victory' ? '🎉' : '💔'}</div>
			<h1 class="text-3xl font-bold text-gray-800 mb-2">
				{gameState === 'victory' ? '¡Misión Completada!' : 'Misión Fallida'}
			</h1>
			<p class="text-gray-600 mb-6">
				{gameState === 'victory'
					? 'Has salvado una vida. ¡Excelente trabajo, socorrista!'
					: 'A pesar de tus esfuerzos, la víctima no ha sobrevivido.'}
			</p>

			<div class="bg-gray-100 rounded-xl p-4 mb-6">
				<p class="text-sm text-gray-500">Puntos ganados</p>
				<p class="text-3xl font-bold text-gray-800">{points}</p>
			</div>

			<div class="flex gap-3">
				<button
					onclick={restart}
					class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
				>
					Intentar de nuevo
				</button>
				<button
					onclick={goHome}
					class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-xl transition-colors"
				>
					Volver al inicio
				</button>
			</div>
		</div>
	</div>
{:else if currentSituation}
	<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
		<!-- Header con vidas, intentos y puntos -->
		<div class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-14 z-10">
			<div class="max-w-4xl mx-auto px-4 py-3">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-4">
						<!-- Vidas -->
						<div class="flex items-center gap-1">
							{#each Array(attemptsRemaining) as _}
								<Heart size={20} class="text-red-500 fill-red-500" />
							{/each}
							{#each Array(3 - attemptsRemaining) as _}
								<Heart size={20} class="text-gray-300" />
							{/each}
						</div>
								<span class="text-sm font-medium {attemptsRemaining === 1 ? 'text-red-600' : 'text-gray-600'}">
									{attemptsRemaining === 0 ? 'Sin intentos' : attemptsRemaining === 1 ? '¡Último intento!' : `${attemptsRemaining} intentos`}
								</span>
					</div>
					<div class="flex items-center gap-4">
						{#if currentSituation.timeLimit > 0}
							<div class="flex items-center gap-1 {timeRemaining <= 10 ? 'text-red-600' : 'text-gray-600'}">
								<Clock size={18} />
								<span class="font-bold">{timeRemaining}s</span>
							</div>
						{/if}
						<div class="flex items-center gap-1 text-gray-600">
							<Trophy size={18} />
							<span class="font-bold">{points}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Contenido principal -->
		<div class="max-w-4xl mx-auto px-4 py-6">
			<!-- Información de emergencia -->
			<div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
				<div class="bg-red-600 text-white px-6 py-4">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-red-200 text-sm">{currentSituation.emergency.type}</p>
							<h1 class="text-2xl font-bold">{currentSituation.emergency.title}</h1>
						</div>
						<div class="text-5xl">{currentSituation.emergency.icon}</div>
					</div>
					<p class="text-red-100 mt-2 flex items-center gap-1">
						<AlertCircle size={16} />
						{currentSituation.emergency.location}
					</p>
				</div>

				<!-- Descripción -->
				<div class="p-6">
					<!-- Imagen de la situación -->
					{#if currentSituation.image}
						<div class="mb-4 rounded-xl overflow-hidden bg-gray-50">
							<img
								src="{base}{currentSituation.image}"
								alt={currentSituation.emergency.title}
								class="w-full h-auto"
							/>
						</div>
					{/if}
					<p class="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
						{currentSituation.description}
					</p>
				</div>

				<!-- Estado de víctima -->
				<div class="px-6 pb-4">
					<div
						class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
						{currentSituation.victimStatus === 'stable'
							? 'bg-green-100 text-green-700'
							: currentSituation.victimStatus === 'critical'
								? 'bg-yellow-100 text-yellow-700'
								: currentSituation.victimStatus === 'very-critical'
									? 'bg-orange-100 text-orange-700'
									: 'bg-red-100 text-red-700'}"
					>
						{currentSituation.victimStatus === 'stable'
							? '😊 Estable'
							: currentSituation.victimStatus === 'critical'
								? '😟 Crítico'
								: currentSituation.victimStatus === 'very-critical'
									? '😰 Muy crítico'
									: '💀 Fallecido'}
					</div>
				</div>

					{#if currentSituation.tip && points > 0}
						<div class="px-6 pb-4">
							<div class="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
								<span class="text-2xl">💡</span>
								<div class="flex-1">
									{#if !tipVisible}
										<div class="flex items-center justify-between">
											<p class="font-medium text-blue-800">Pista disponible</p>
											<button
												onclick={useTip}
												class="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
											>
												Ver pista (-{currentSituation.tip.cost} pts)
											</button>
										</div>
									{:else}
										<p class="text-sm text-blue-700">{currentSituation.tip.text}</p>
									{/if}
t							<p class="text-xs text-blue-500 mt-1">-{tipCost} puntos descontados</p>
								</div>
							</div>
						</div>
					{/if}
			</div>

			<!-- Opciones -->
			<div class="space-y-3">
				{#each shuffledOptions as option}
					<button
						onclick={() => makeDecision(option.id)}
						class="w-full bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-2xl p-5 text-left transition-all hover:shadow-lg active:scale-[0.99]"
					>
						<div class="flex items-start gap-4">
							<div
								class="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
							>
								{option.icon || '❓'}
							</div>
							<div class="flex-1">
								<p class="font-bold text-gray-800 text-lg">{option.text}</p>
							</div>
						</div>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Modal de feedback -->
	{#if showFeedback && feedbackData}
		<div
			class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
			onclick={() => continueAfterFeedback()}
			role="button"
			tabindex="-1"
		>
			<div
				class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
				onclick={(e) => e.stopPropagation()}
			>
				<div
					class="{feedbackData.correct ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-4 flex items-center gap-3"
				>
					<span class="text-4xl">{feedbackData.correct ? '✅' : '❌'}</span>
					<div>
						<h2 class="text-xl font-bold">
							{feedbackData.correct ? '¡Correcto!' : 'Incorrecto'}
						</h2>
						{#if feedbackData.correct && feedbackData.points > 0}
							<p class="text-green-100">+{feedbackData.totalPoints} puntos</p>
						{/if}
					</div>
				</div>

				<div class="p-6">
					<p class="text-gray-700 text-lg mb-4">{feedbackData.feedback}</p>

					{#if !feedbackData.correct && feedbackData.attemptsRemaining > 0}
						<div class="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 flex items-center gap-2">
							<span>⚠️</span>
							<p class="text-sm text-yellow-800">
								Tienes {feedbackData.attemptsRemaining} intento{feedbackData.attemptsRemaining !== 1 ? 's' : ''} restante. ¡Inténtalo de nuevo!
							</p>
						</div>
					{/if}

					{#if feedbackData.timeBonus > 0}
						<div class="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 flex items-center gap-2">
							<span>⚡</span>
							<p class="text-sm text-yellow-800">
								Bonus por velocidad: +{feedbackData.timeBonus} puntos
							</p>
						</div>
					{/if}

					<button
						onclick={() => continueAfterFeedback()}
						class="w-full {feedbackData.correct
							? 'bg-green-600 hover:bg-green-700'
							: 'bg-red-600 hover:bg-red-700'} text-white font-bold py-3 px-6 rounded-xl transition-colors"
					>
						{feedbackData.correct ? 'Continuar' : feedbackData.attemptsRemaining > 0 ? 'Intentar de nuevo' : 'Ver resultados'}
					</button>
				</div>
			</div>
		</div>
	{/if}
{/if}
