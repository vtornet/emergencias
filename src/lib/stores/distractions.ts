import { writable, derived, get } from 'svelte/store';
import type { Distraction, DistractionResult, DistractionType } from '$lib/types/distractions';
import { getRandomDistraction } from '$lib/data/distractions';

const STORAGE_KEY = 'emergencias-distractions';

interface DistractionStoreState {
	current: Distraction | null;
	isActive: boolean;
	dismissedAt: number | null;
	enabled: boolean;
	settings: {
		notifications: boolean;
		calls: boolean;
		modals: boolean;
		difficulty: 'easy' | 'normal' | 'hard';
	};
}

function loadState(): DistractionStoreState {
	const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
	if (saved) {
		try {
			const parsed = JSON.parse(saved);
			return {
				current: null,
				isActive: false,
				dismissedAt: null,
				enabled: parsed.enabled ?? true,
				settings: {
					notifications: parsed.settings?.notifications ?? true,
					calls: parsed.settings?.calls ?? true,
					modals: parsed.settings?.modals ?? true,
					difficulty: (parsed.settings?.difficulty ?? 'normal') as 'easy' | 'normal' | 'hard'
				}
			};
		} catch (e) {
			console.error('Error loading distraction settings:', e);
		}
	}

	return {
		current: null,
		isActive: false,
		dismissedAt: null,
		enabled: true,
		settings: {
			notifications: true,
			calls: true,
			modals: true,
			difficulty: 'normal'
		}
	};
}

function saveState(state: DistractionStoreState) {
	if (typeof localStorage !== 'undefined') {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({
				enabled: state.enabled,
				settings: state.settings
			}));
		} catch (e) {
			console.error('Error saving distraction settings:', e);
		}
	}
}

function createDistractionStore() {
	const initialState = loadState();

	const { subscribe, set, update } = writable(initialState);

	// Timer para mostrar distracciones
	let distractionTimer: ReturnType<typeof setInterval> | null = null;
	let timeoutTimer: ReturnType<typeof setTimeout> | null = null;

	// Función auxiliar para manejar el timeout internamente
	function handleTimeout(currentDistractionId: string, onResult?: (result: DistractionResult) => void) {
		update((s) => {
			if (!s.current || s.current.id !== currentDistractionId) return s;

			const result: DistractionResult = {
				dismissed: false,
				timeTaken: s.current.duration || 0
			};

			onResult?.(result);

			return {
				...s,
				current: null,
				isActive: false
			};
		});
	}

	return {
		subscribe,
		set,
		update,

		enable: () => {
			update((s) => {
				const newState = { ...s, enabled: true };
				saveState(newState);
				return newState;
			});
		},

		disable: () => {
			update((s) => {
				const newState = { ...s, enabled: false };
				saveState(newState);
				return newState;
			});
			if (distractionTimer) {
				clearInterval(distractionTimer);
				distractionTimer = null;
			}
			if (timeoutTimer) {
				clearTimeout(timeoutTimer);
				timeoutTimer = null;
			}
		},

		// Mostrar una distracción específica
		show: (distraction: Distraction, onResult?: (result: DistractionResult) => void) => {
			let enabled = false;

			// Verificar si está enabled dentro del update
			update((s) => {
				if (!s.enabled) return s;
				enabled = true;
				return {
					...s,
					current: distraction,
					isActive: true,
					dismissedAt: null
				};
			});

			if (!enabled) return;

			// Auto-dismiss después del duration
			if (distraction.duration) {
				timeoutTimer = setTimeout(() => {
					handleTimeout(distraction.id, onResult);
				}, distraction.duration);
			}
		},

		// Mostrar distracción aleatoria
		showRandom: (onResult?: (result: DistractionResult) => void) => {
			const types: DistractionType[] = [];
			let enabled = false;
			let difficulty: 'easy' | 'normal' | 'hard' = 'normal';

			// Obtener configuración actual
			update((s) => {
				enabled = s.enabled;
				if (s.settings.modals) types.push('modal');
				if (s.settings.notifications) types.push('notification');
				if (s.settings.calls) types.push('call');
				difficulty = s.settings.difficulty;
				return s;
			});

			if (!enabled || types.length === 0) return;

			const randomType = types[Math.floor(Math.random() * types.length)];
			const pool = getRandomDistraction(difficulty);

			if (!pool) return;

			// Crear distracción personalizada si es del tipo correcto
			let distraction: Distraction;
			if (pool.type === randomType) {
				distraction = pool;
			} else {
				// Crear distracción del tipo correcto
				distraction = {
					...pool,
					type: randomType
				};
			}

			update((s) => ({
				...s,
				current: distraction,
				isActive: true,
				dismissedAt: null
			}));

			// Auto-dismiss
			if (distraction.duration) {
				timeoutTimer = setTimeout(() => {
					handleTimeout(distraction.id, onResult);
				}, distraction.duration);
			}
		},

		// Cerrar la distracción actual
		dismiss: () => {
			let result: DistractionResult | null = null;

			update((s) => {
				if (!s.current) return s;

				result = {
					dismissed: true,
					timeTaken: Date.now() - (s.dismissedAt || Date.now())
				};

				return {
					...s,
					current: null,
					isActive: false,
					dismissedAt: Date.now()
				};
			});

			return result;
		},

		// Actualizar configuración y guardar
		updateSettings: (settings: Partial<DistractionStoreState['settings']>) => {
			update((s) => {
				const newState = {
					...s,
					settings: { ...s.settings, ...settings }
				};
				saveState(newState);
				return newState;
			});
		},

		// Resetear a valores por defecto
		reset: () => {
			const defaultState: DistractionStoreState = {
				current: null,
				isActive: false,
				dismissedAt: null,
				enabled: true,
				settings: {
					notifications: true,
					calls: true,
					modals: true,
					difficulty: 'normal'
				}
			};
			set(defaultState);
			saveState(defaultState);
		}
	};
}

export const distractionStore = createDistractionStore();
