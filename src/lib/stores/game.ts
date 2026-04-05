import { writable, derived, get } from 'svelte/store';

// Tipos
import type {
	GameState,
	PlayerRank,
	PlayerRankInfo,
	Badge,
	Situation,
	SituationProgress,
	DecisionResult,
	VictimStatus,
	Option
} from '$lib/types/game';

// Rangos y sus requisitos
const RANKS: Record<PlayerRank, { name: string; level: number; points: number }> = {
	practicante: { name: 'Practicante', level: 1, points: 0 },
	'socorrista-novato': { name: 'Socorrista Novato', level: 2, points: 500 },
	'socorrista-certificado': { name: 'Socorrista Certificado', level: 3, points: 1500 },
	'coordinador-equipo': { name: 'Coordinador de Equipo', level: 4, points: 3500 },
	'director-emergencias': { name: 'Director de Emergencias', level: 5, points: 7000 }
};

// Insignias disponibles
const ALL_BADGES: Badge[] = [
	{
		id: 'first-aid',
		name: 'Primeros Auxilios',
		description: 'Completa tu primera situación',
		icon: '🥇',
		unlocked: false,
		requirement: { type: 'situations', value: 1 }
	},
	{
		id: 'savior',
		name: 'Salvador',
		description: 'Salva 5 víctimas',
		icon: '🚑',
		unlocked: false,
		requirement: { type: 'survivors', value: 5 }
	},
	{
		id: 'quick-decision',
		name: 'Decisión Rápida',
		description: 'Toma una decisión correcta en menos de 10 segundos',
		icon: '⚡',
		unlocked: false,
		requirement: { type: 'speed', value: 1 }
	},
	{
		id: 'resilient',
		name: 'Resiliente',
		description: 'Completa una situación tras haber fallado',
		icon: '💪',
		unlocked: false,
		requirement: { type: 'situations', value: 1 }
	},
	{
		id: 'perfect',
		name: 'Ejecución Perfecta',
		description: 'Completa una situación sin errores',
		icon: '⭐',
		unlocked: false,
		requirement: { type: 'perfect', value: 1 }
	},
	{
		id: 'veteran',
		name: 'Veterano',
		description: 'Completa todas las situaciones disponibles',
		icon: '🏆',
		unlocked: false,
		requirement: { type: 'situations', value: 999 }
	}
];

// Tipo de configuración
type GameSettings = {
	sound: boolean;
	vibration: boolean;
	difficulty: 'easy' | 'normal' | 'hard';
};

// Estado inicial
function createInitialState() {
	const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('emergencias-game') : null;
	if (saved) {
		try {
			return JSON.parse(saved);
		} catch (e) {
			console.error('Error loading saved game:', e);
		}
	}

	return {
		currentState: 'menu' as GameState,
		currentSituation: null,
		situationHistory: [] as SituationProgress[],
		hearts: 3,
		maxHearts: 3,
		attemptsRemaining: 3,
		points: 0,
		rank: {
			rank: 'practicante' as PlayerRank,
			name: RANKS.practicante.name,
			level: 1,
			pointsToNext: RANKS['socorrista-novato'].points,
			totalPoints: 0
		},
		badges: ALL_BADGES.map((b) => ({ ...b })),
		settings: {
			sound: true,
			vibration: true,
			difficulty: 'normal' as const
		}
	};
}

// Store principal
function createGameStore() {
	const { subscribe, set, update } = writable(createInitialState());

	return {
		subscribe,
		set,
		update,
		reset: () => {
			const initial = createInitialState();
			set(initial);
			saveGame(initial);
		},
		startGame: (situation: Situation) => {
			update((state) => ({
				...state,
				currentState: 'playing',
				currentSituation: situation,
				hearts: state.maxHearts,
				attemptsRemaining: 3
			}));
		},
		makeDecision: (
			optionId: string,
			timeTaken: number
		): DecisionResult => {
			const state = get(gameStore);
			const situation = state.currentSituation!;
				// Timeout sin respuesta = incorrecto
				if (!optionId) {
					const newAttempts = state.attemptsRemaining - 1;
					update((s) => ({ ...s, attemptsRemaining: newAttempts }));

					if (newAttempts <= 0) {
						return {
							correct: false,
							feedback: "Tiempo agotado. No actuaste a tiempo y la víctima no ha sobrevivido.",
							points: 0,
							timeBonus: 0,
							totalPoints: 0,
							victimStatus: "deceased",
							gameOver: true,
							nextSituation: undefined,
							repeat: false,
							attemptsRemaining: 0
						};
					} else {
						return {
							correct: false,
							feedback: "Tiempo agotado. Pierdes un intento. ¡Actúa más rápido!",
							points: 0,
							timeBonus: 0,
							totalPoints: 0,
							victimStatus: situation.victimStatus === "stable" ? "critical" : situation.victimStatus === "critical" ? "very-critical" : "deceased",
							gameOver: false,
							nextSituation: undefined,
							repeat: true,
							attemptsRemaining: newAttempts
						};
					}
				}
			const option = situation.options.find((o: Option) => o.id === optionId)!;

			const correct = option.isCorrect;
			const timeBonus = timeTaken < 10 && correct ? 50 : 0;
			const totalPoints = option.points + timeBonus;

			let victimStatus: VictimStatus = situation.victimStatus;
			let gameOver = false;
			let repeatSituation = false;
			let nextSituationId: string | undefined = option.leadsTo;

			// Sistema de 3 intentos
			if (!correct) {
				const newAttempts = state.attemptsRemaining - 1;

				update((s) => ({ ...s, attemptsRemaining: newAttempts }));

				if (newAttempts <= 0) {
					// Se agotaron los 3 intentos - GAME OVER
					gameOver = true;
					victimStatus = 'deceased';
					nextSituationId = undefined;
				} else {
					// Todavía tiene intentos - repetir la misma situación
					repeatSituation = true;
					nextSituationId = undefined;
					// Empeorar estado de víctima visualmente
					if (victimStatus === 'stable') victimStatus = 'critical';
					else if (victimStatus === 'critical') victimStatus = 'very-critical';
					else if (victimStatus === 'very-critical') victimStatus = 'deceased';
				}
			} else {
				// Respuesta correcta - resetear intentos para la siguiente
				update((s) => ({ ...s, attemptsRemaining: 3 }));

				// Actualizar puntos y verificar rangos
				update((s) => {
					const newPoints = s.points + totalPoints;
					const newRank = calculateRank(newPoints);
					return {
						...s,
						points: newPoints,
						rank: newRank
					};
				});
n				// Guardar cambios
				saveGame({ ...s, points: s.points + totalPoints, rank: calculateRank(s.points + totalPoints) });

				// Verificar insignias
				if (timeTaken < 10) {
					update((s) => unlockBadge(s, 'quick-decision'));
				}
			}

			const result: DecisionResult = {
				correct,
				feedback: option.feedback,
				points: option.points,
				timeBonus,
				totalPoints,
				victimStatus,
				gameOver,
				nextSituation: nextSituationId,
				repeat: repeatSituation,
				attemptsRemaining: state.attemptsRemaining - 1
			};

			return result;
		},
		updateGameState: (newState: GameState) => {
			update((s) => ({ ...s, currentState: newState }));
		},
		updateSettings: (settings: Partial<GameSettings>) => {
			update((s) => {
				const newSettings = { ...s.settings, ...settings };
				const newState = { ...s, settings: newSettings };
				saveGame(newState);
				return newState;
			});
		},
		completeSituation: (situationId: string, survived: boolean, perfect: boolean) => {
			update((s) => {
				let newBadges = [...s.badges];

				// Primera situación completada
				if (s.situationHistory.length === 0) {
					newBadges = unlockBadgeInArray(newBadges, 'first-aid');
				}

				// Ejecución perfecta
				if (perfect) {
					newBadges = unlockBadgeInArray(newBadges, 'perfect');
				}

				// Contar víctimas salvadas
				const survivors = s.situationHistory.filter((h: SituationProgress) => h.victimSurvived).length + (survived ? 1 : 0);
				if (survivors >= 5) {
					newBadges = unlockBadgeInArray(newBadges, 'savior');
				}

				const newState = {
					...s,
					situationHistory: [
						...s.situationHistory,
						{
							situationId,
							completed: true,
							decisions: [],
							points: 0,
							victimSurvived: survived,
							attempts: 1
						}
					],
					badges: newBadges
				};

				saveGame(newState);
				return newState;
			});
		}
	};
}

function calculateRank(points: number): PlayerRankInfo {
	let currentRank: PlayerRank = 'practicante';

	for (const [rank, data] of Object.entries(RANKS)) {
		if (points >= data.points) {
			currentRank = rank as PlayerRank;
		}
	}

	const rankData = RANKS[currentRank];
	const ranks = Object.keys(RANKS) as PlayerRank[];
	const currentIndex = ranks.indexOf(currentRank);
	const nextRank = ranks[currentIndex + 1];

	return {
		rank: currentRank,
		name: rankData.name,
		level: rankData.level,
		pointsToNext: nextRank ? RANKS[nextRank].points - points : 0,
		totalPoints: points
	};
}

function unlockBadge(state: ReturnType<typeof createInitialState>, badgeId: string) {
	const badges = state.badges.map((b: Badge) =>
		b.id === badgeId && !b.unlocked ? { ...b, unlocked: true, unlockedAt: new Date() } : b
	);
	return { ...state, badges };
}

function unlockBadgeInArray(badges: Badge[], badgeId: string): Badge[] {
	return badges.map((b) =>
		b.id === badgeId && !b.unlocked ? { ...b, unlocked: true, unlockedAt: new Date() } : b
	);
}

function saveGame(state: ReturnType<typeof createInitialState>) {
	try {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('emergencias-game', JSON.stringify(state));
		}
	} catch (e) {
		console.error('Error saving game:', e);
	}
}

export const gameStore = createGameStore();

// Stores derivados
export const currentSituation = derived(gameStore, ($state) => $state.currentSituation);
export const hearts = derived(gameStore, ($state) => $state.hearts);
export const points = derived(gameStore, ($state) => $state.points);
export const badges = derived(gameStore, ($state) => $state.badges.filter((b: Badge) => b.unlocked));
export const allBadges = derived(gameStore, ($state) => $state.badges);
export const rank = derived(gameStore, ($state) => $state.rank);
