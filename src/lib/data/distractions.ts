import type { Distraction } from '$lib/types/distractions';

// Banco de distracciones por nivel de dificultad
const distractionPool = {
	easy: [
		{
			id: 'notif-1',
			type: 'notification' as const,
			title: 'Tienes nuevos mensajes',
			message: '3 mensajes sin leer de WhatsApp',
			app: 'whatsapp',
			duration: 5000,
			points: 10,
			canDismiss: true
		},
		{
			id: 'modal-1',
			type: 'modal' as const,
			title: 'Distracción',
			message: '¿Has visto las nuevas historias de Instagram? ¡Tus amigos están activos!',
			duration: 4000,
			canDismiss: true
		}
	],
	normal: [
		{
			id: 'notif-2',
			type: 'notification' as const,
			title: 'Recordatorio',
			message: 'Reunión de trabajo en 15 minutos',
			app: 'calendar',
			duration: 6000,
			points: 15,
			canDismiss: true,
			showTimer: true
		},
		{
			id: 'call-1',
			type: 'call' as const,
			title: 'Mamá',
			message: 'Te estoy llamando...',
			caller: 'Mamá',
			duration: 10000,
			points: 25,
			canDismiss: false
		},
		{
			id: 'modal-2',
			type: 'modal' as const,
			title: 'Distracción',
			message: 'Tu batería está al 15%. ¿Quieres activar el modo ahorro de energía?',
			duration: 5000,
			points: 15,
			canDismiss: true,
			showTimer: true
		}
	],
	hard: [
		{
			id: 'notif-3',
			type: 'notification' as const,
			title: 'Oferta flash',
			message: '¡50% de descuento en tu tienda favorita por 2 horas solo!',
			app: 'telegram',
			duration: 4000,
			points: 20,
			canDismiss: true
		},
		{
			id: 'call-2',
			type: 'call' as const,
			title: 'Servicio de Urgencia',
			message: 'Teléfono emergencias - ¿Contestar?',
			caller: 'Servicio',
			duration: 8000,
			points: 30,
			canDismiss: false
		},
		{
			id: 'modal-3',
			type: 'modal' as const,
			title: 'Distracción múltiple',
			message: 'Tienes 5 notificaciones pendientes de diferentes apps. ¿Quieres revisarlas ahora?',
			duration: 6000,
			points: 25,
			canDismiss: true,
			showTimer: true
		}
	]
};

// Generar distracción aleatoria según dificultad
export function getRandomDistraction(difficulty: 'easy' | 'normal' | 'hard'): Distraction | null {
	const pool = distractionPool[difficulty];
	const randomIndex = Math.floor(Math.random() * pool.length);
	return pool[randomIndex];
}

// Generar distracción específica
export function getDistraction(type: Distraction['type'], id: string): Distraction | null {
	for (const pool of Object.values(distractionPool)) {
		const found = pool.find((d) => d.type === type && d.id === id);
		if (found) return found as Distraction;
	}
	return null;
}
