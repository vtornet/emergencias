// Estados del juego
export type GameState = 'menu' | 'playing' | 'paused' | 'feedback' | 'results' | 'victory' | 'gameover';

// Estados de la víctima
export type VictimStatus = 'stable' | 'critical' | 'very-critical' | 'deceased';

// Tipos de situación
export type SituationType = 'decision' | 'final';

// Tipos de final
export type FinalType = 'victoria-completa' | 'victoria-parcial' | 'gameover';

// Tipos de respuesta
export type OptionResult = 'correct' | 'incorrect' | 'partial' | 'timeout';

// Opción de respuesta (sistema ramificado)
export interface Option {
	id: string;
	text: string;
	icon?: string;
	isCorrect: boolean;
	feedback: string;
	points: number;
	timeBonus?: number;
	victimStatusChange?: VictimStatus;
	goTo?: string; // ID de la siguiente situación (opcional para casos especiales como "volver al menú")
}

// Situación de emergencia
export interface Situation {
	id: string;
	type: SituationType; // 'decision' o 'final'
	finalType?: FinalType; // Solo si type es 'final'
	emergency: {
		title: string;
		location: string;
		type: string;
		icon: string;
	};
	description: string;
	victimStatus: VictimStatus;
	timeLimit: number; // segundos, 0 = sin límite
	options: Option[];
	backgroundSound?: string;
	distractors?: Distractor[];
	image?: string;
	tip?: {
		text: string;
		cost: number;
	};
	// Para rastrear el camino tomado (opcional)
	pathHint?: string; // Descripción del camino actual
}

// Distractores que aparecen en pantalla
export interface Distractor {
	type: 'visual' | 'audio' | 'text';
	content: string;
	position?: { x: number; y: number };
	duration?: number;
}

// Progreso del jugador en una situación
export interface SituationProgress {
	situationId: string;
	completed: boolean;
	decisions: {
		optionId: string;
		timeTaken: number;
		correct: boolean;
		timestamp: number;
	}[];
	points: number;
	victimSurvived: boolean;
	attempts: number;
}

// Insignia
export interface Badge {
	id: string;
	name: string;
	description: string;
	icon: string;
	unlocked: boolean;
	unlockedAt?: Date;
	requirement: {
		type: 'situations' | 'points' | 'survivors' | 'speed' | 'perfect';
		value: number;
	};
}

// Nivel/Rango del jugador
export type PlayerRank =
	| 'practicante'
	| 'socorrista-novato'
	| 'socorrista-certificado'
	| 'coordinador-equipo'
	| 'director-emergencias';

export interface PlayerRankInfo {
	rank: PlayerRank;
	name: string;
	level: number;
	pointsToNext: number;
	totalPoints: number;
}

// Estado global del juego
export interface GameStore {
	currentState: GameState;
	currentSituation: Situation | null;
	situationHistory: SituationProgress[];
	hearts: number;
	maxHearts: number;
	attemptsRemaining: number;
	points: number;
	rank: PlayerRankInfo;
	badges: Badge[];
	settings: {
		sound: boolean;
		vibration: boolean;
		difficulty: 'easy' | 'normal' | 'hard';
	};
	// Sistema ramificado: camino tomado en la situación actual
	currentPath: string[]; // Array de IDs de opciones elegidas ['cardiac-1-b', 'cardiac-2-a', ...]
	totalPointsInRun: number; // Puntos acumulados en la partida actual
	decisionsInRun: number; // Número de decisiones tomadas en esta partida
}

// Resultado de una decisión
export interface DecisionResult {
	correct: boolean;
	feedback: string;
	points: number;
	timeBonus: number;
	totalPoints: number;
	victimStatus: VictimStatus;
	gameOver: boolean;
	nextSituation: string; // ID de la siguiente situación (siempre presente en sistema ramificado)
	isFinal: boolean; // true si la siguiente situación es un final
	finalType?: FinalType; // Tipo de final si isFinal es true
	pathTaken: string[]; // Camino completo tomado
}

// Situación disponible en el menú principal
export interface AvailableSituation {
	id: string;
	title: string;
	description: string;
	icon: string;
	difficulty: number;
	firstSituation: string;
	image?: string;
}

// Juego de encontrar errores
export interface FindErrorsError {
	id: number;
	x: number; // porcentaje desde la izquierda (0-100)
	y: number; // porcentaje desde arriba (0-100)
	radius: number; // porcentaje del ancho de la imagen
	nombre: string;
	feedback: string;
	consecuencia: string;
}

export interface FindErrorsGame {
	id: string;
	title: string;
	description: string;
	image: string;
	imageWithSolution: string;
	timeLimit: number;
	pointsPerError: number;
	bonusUnder30s: number;
	difficulty: 'easy' | 'intermediate' | 'hard';
	errores: FindErrorsError[];
	summary: {
		titulo: string;
		aprendizaje: string[];
	};
}
