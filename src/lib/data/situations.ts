import type { Situation, AvailableSituation } from '$lib/types/game';
import { fireSituations } from './fire-situations';
import { cardiacArrestSituations as cardiacArrestSituationsBranching } from './situations-branching';

// Escenario: Parada Cardíaca en Centro Comercial
// USANDO SISTEMA RAMIFICADO NUEVO
export const cardiacArrestSituations = cardiacArrestSituationsBranching;

// Mapa de situaciones por ID para fácil acceso
export const situationsMap = new Map<string, Situation>();
cardiacArrestSituations.forEach((s) => situationsMap.set(s.id, s));
fireSituations.forEach((s) => situationsMap.set(s.id, s));

// Situaciones disponibles para jugar
export const availableSituations: AvailableSituation[] = [
	{
		id: 'cardiac-arrest',
		title: 'Parada Cardíaca',
		description: 'Actúa rápido ante una parada cardíaca en un lugar público',
		icon: '🫀',
		difficulty: 1,
		firstSituation: 'cardiac-1',
		image: '/images/scenarios/cardiac-arrest.png'
	},
	{
		id: 'fire-emergency',
		title: 'Incendio Doméstico',
		description: 'Un pequeño incendio en la cocina. ¿Sabes cómo actuar?',
		icon: '🔥',
		difficulty: 2,
		firstSituation: 'fire-1',
		image: '/images/scenarios/fire.png'
	}
];
