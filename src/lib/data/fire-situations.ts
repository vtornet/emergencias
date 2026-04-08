import type { Situation } from '$lib/types/game';

export const fireSituations: Situation[] = [
	{
		id: 'fire-1',
		type: 'decision',
		emergency: { title: 'Olor a Quemado', location: 'Casa - Sala', type: 'Incendio', icon: '👃' },
		description: 'Estás en tu casa con el móvil. De repente, hueles a quemado. ¡Dejaste la sartén en el fuego!',
		image: '/images/scenarios/fire-1.png',
		victimStatus: 'stable',
		timeLimit: 15,
		options: [
			{ id: 'fire-1-a', text: 'Correr a la cocina', icon: '🏃', isCorrect: false, feedback: 'No corras sin evaluar.', points: 0, goTo: 'fire-1-wrong' },
			{ id: 'fire-1-b', text: 'Acercarte con precaucion', icon: '👀', isCorrect: true, feedback: '¡Correcto! Evaluar primero.', points: 100, goTo: 'fire-2' },
			{ id: 'fire-1-c', text: 'Abrir ventanas', icon: '🪟', isCorrect: false, feedback: '¡ERROR! Abrir ventanas aporta oxígeno.', points: 0, goTo: 'fire-1-wrong-2' },
			{ id: 'fire-1-d', text: 'Llamar al 112', icon: '📞', isCorrect: false, feedback: 'Primero evalúa.', points: 0, goTo: 'fire-1-wrong' }
		]
	},
	{
		id: 'fire-1-wrong',
		type: 'decision',
		emergency: { title: '¡Incendio!', location: 'Cocina', type: 'Incendio', icon: '🔥' },
		description: 'Llegas corriendo. La sartén arde y las llamas suben.',
		victimStatus: 'critical',
		timeLimit: 12,
		options: [
			{ id: 'fire-1w-a', text: 'Echar agua', icon: '💧', isCorrect: false, feedback: '¡FATAL! Agua en grasa explota.', points: 0, goTo: 'fire-death' },
			{ id: 'fire-1w-b', text: 'Usar extintor o manta', icon: '🧯', isCorrect: true, feedback: '¡Bien! Controlas el fuego.', points: 50, goTo: 'fire-2-safe' },
			{ id: 'fire-1w-c', text: 'Salir y llamar al 112', icon: '🚪', isCorrect: false, feedback: 'Perdiste tiempo.', points: 0, goTo: 'fire-death-2' }
		]
	},
	{
		id: 'fire-1-wrong-2',
		type: 'decision',
		emergency: { title: '¡Fuego Avanzado!', location: 'Cocina', type: 'Incendio', icon: '🔥' },
		description: 'Las ventanas avivaron las llamas. Las cortinas arden. ¡Critico!',
		victimStatus: 'very-critical',
		timeLimit: 10,
		options: [
			{ id: 'fire-1w2-a', text: 'Apagar con manos', icon: '✋', isCorrect: false, feedback: 'Te quemas.', points: 0, goTo: 'fire-death' },
			{ id: 'fire-1w2-b', text: 'Salir y llamar al 112', icon: '🏃', isCorrect: true, feedback: 'Es tu única opcion.', points: 30, goTo: 'fire-survived-damaged' },
			{ id: 'fire-1w2-c', text: 'Buscar extintor', icon: '🔍', isCorrect: false, feedback: 'Pierdes tiempo.', points: 0, goTo: 'fire-death' }
		]
	},
	{
		id: 'fire-2',
		type: 'decision',
		emergency: { title: 'Incendio Controlado', location: 'Cocina', type: 'Incendio', icon: '🔥' },
		description: 'Llegas con calma. La sartén arde. Hay extintor y manta.',
		image: '/images/scenarios/fire-2.png',
		victimStatus: 'stable',
		timeLimit: 10,
		options: [
			{ id: 'fire-2-a', text: 'Echar agua', icon: '💧', isCorrect: false, feedback: '¡ERROR! Agua en grasa esparce fuego.', points: 0, goTo: 'fire-2-danger' },
			{ id: 'fire-2-b', text: 'Cubrir con manta', icon: '🔘', isCorrect: true, feedback: '¡Perfecto! La manta sofoca el fuego.', points: 100, goTo: 'fire-3' },
			{ id: 'fire-2-c', text: 'Usar extintor', icon: '🧯', isCorrect: true, feedback: '¡Correcto! Extintor efectivo.', points: 100, goTo: 'fire-3' },
			{ id: 'fire-2-d', text: 'Mover al fregadero', icon: '🚰', isCorrect: false, feedback: '¡Peligroso!', points: 0, goTo: 'fire-2-danger' }
		]
	},
	{
		id: 'fire-2-danger',
		type: 'decision',
		emergency: { title: '¡Fuego Expandido!', location: 'Cocina', type: 'Incendio', icon: '⚠️' },
		description: 'El fuego se ha extendido. Humo denso. ¡Actua YA!',
		victimStatus: 'critical',
		timeLimit: 8,
		options: [
			{ id: 'fire-2d-a', text: 'Seguir apagando', icon: '🧯', isCorrect: false, feedback: 'Fuego demasiado grande.', points: 0, goTo: 'fire-death' },
			{ id: 'fire-2d-b', text: 'Salir y llamar 112', icon: '🚪', isCorrect: true, feedback: 'Sales y llamas a bomberos.', points: 20, goTo: 'fire-survived-damaged' }
		]
	},
	{
		id: 'fire-3',
		type: 'decision',
		emergency: { title: 'Fuego Apagado', location: 'Cocina', type: 'Incendio', icon: '✅' },
		description: 'Has apagado el fuego. Hay humo. La sartén esta caliente.',
		image: '/images/scenarios/fire-3.png',
		victimStatus: 'stable',
		timeLimit: 15,
		options: [
			{ id: 'fire-3-a', text: 'Abrir ventanas', icon: '🪟', isCorrect: true, feedback: '¡Correcto! Ventilar elimina gases.', points: 100, goTo: 'fire-4' },
			{ id: 'fire-3-b', text: 'Tocar la sartén', icon: '✋', isCorrect: false, feedback: '¡No! Esta muy caliente.', points: 0, goTo: 'fire-3-injured' },
			{ id: 'fire-3-c', text: 'Volver a la sala', icon: '📱', isCorrect: false, feedback: 'Debes vigilar.', points: 0, goTo: 'fire-3-injured' }
		]
	},
	{
		id: 'fire-3-injured',
		type: 'decision',
		emergency: { title: 'Lesion Menor', location: 'Cocina', type: 'Incendio', icon: '🩹' },
		description: 'Has sufrido una pequena lesion.',
		victimStatus: 'stable',
		timeLimit: 0,
		options: [
			{ id: 'fire-3i-a', text: 'Ventilar', icon: '🪟', isCorrect: true, feedback: 'Has sobrevivido.', points: 20, goTo: 'fire-survived-injured' }
		]
	},
	{
		id: 'fire-4',
		type: 'decision',
		emergency: { title: 'Todo Controlado', location: 'Cocina', type: 'Incendio', icon: '🏠' },
		description: 'Has ventilado. El fuego esta apagado.',
		image: '/images/scenarios/fire-4.png',
		victimStatus: 'stable',
		timeLimit: 10,
		options: [
			{ id: 'fire-4-a', text: 'Dejar enfriar', icon: '⏳', isCorrect: true, feedback: '¡Excelente!', points: 100, goTo: 'fire-victory' },
			{ id: 'fire-4-b', text: 'Mover la sartén', icon: '🚰', isCorrect: false, feedback: 'Todavia caliente.', points: 0, goTo: 'fire-survived-injured' },
			{ id: 'fire-4-c', text: 'Encender extractor', icon: '💨', isCorrect: true, feedback: '¡Bien!', points: 100, goTo: 'fire-victory' }
		]
	},
	{
		id: 'fire-victory',
		type: 'final',
		finalType: 'victoria-completa',
		emergency: { title: '¡Mision Cumplida!', location: 'Casa', type: 'Incendio', icon: '🎉' },
		description: 'Has gestionado correctamente el incendio. Nunca dejes la cocina desatendida.',
		image: '/images/scenarios/fire-victory.png',
		victimStatus: 'stable',
		timeLimit: 0,
		options: [
			{ id: 'fire-retry', text: 'Jugar de nuevo', icon: '🔄', isCorrect: true, feedback: '', points: 0, goTo: 'fire-1' },
			{ id: 'fire-menu', text: 'Volver al inicio', icon: '🏠', isCorrect: true, feedback: '', points: 0 }
		]
	},
	{
		id: 'fire-survived-injured',
		type: 'final',
		finalType: 'victoria-parcial',
		emergency: { title: 'Sobreviviste', location: 'Casa', type: 'Incendio', icon: '🩹' },
		description: 'Has sobrevivido con lesiones menores.',
		victimStatus: 'stable',
		timeLimit: 0,
		options: [
			{ id: 'fire-retry', text: 'Intentar de nuevo', icon: '🔄', isCorrect: true, feedback: '', points: 0, goTo: 'fire-1' },
			{ id: 'fire-menu', text: 'Volver al inicio', icon: '🏠', isCorrect: true, feedback: '', points: 0 }
		]
	},
	{
		id: 'fire-survived-damaged',
		type: 'final',
		finalType: 'victoria-parcial',
		emergency: { title: 'Sobreviviste con Danos', location: 'Casa', type: 'Incendio', icon: '🏚️' },
		description: 'La casa tiene danos importantes. Actua mas rapido la proxima vez.',
		victimStatus: 'stable',
		timeLimit: 0,
		options: [
			{ id: 'fire-retry', text: 'Intentar de nuevo', icon: '🔄', isCorrect: true, feedback: '', points: 0, goTo: 'fire-1' },
			{ id: 'fire-menu', text: 'Volver al inicio', icon: '🏠', isCorrect: true, feedback: '', points: 0 }
		]
	},
	{
		id: 'fire-2-safe',
		type: 'decision',
		emergency: { title: 'Fuego Controlado', location: 'Cocina', type: 'Incendio', icon: '✅' },
		description: 'Has controlado el fuego pero cometiste un error al principio.',
		victimStatus: 'stable',
		timeLimit: 15,
		options: [
			{ id: 'fire-2s-a', text: 'Ventilar', icon: '🪟', isCorrect: true, feedback: 'Has sobrevivido con leccion.', points: 50, goTo: 'fire-survived-injured' }
		]
	},
	{
		id: 'fire-death',
		type: 'final',
		finalType: 'gameover',
		emergency: { title: 'Tragedia', location: 'Casa', type: 'Incendio', icon: '💀' },
		description: 'TUS ACCIONES HAN SIDO FATALES. El incendio te ha consumido.',
		victimStatus: 'deceased',
		timeLimit: 0,
		options: [
			{ id: 'fire-death-retry', text: 'Reintentar', icon: '🔄', isCorrect: true, feedback: '', points: 0, goTo: 'fire-1' },
			{ id: 'fire-death-menu', text: 'Volver al menu', icon: '🏠', isCorrect: true, feedback: '', points: 0 }
		]
	},
	{
		id: 'fire-death-2',
		type: 'final',
		finalType: 'gameover',
		emergency: { title: 'Demasiado Tarde', location: 'Casa', type: 'Incendio', icon: '💀' },
		description: 'Saliste pero perdiste tiempo. La casa se quemo.',
		victimStatus: 'deceased',
		timeLimit: 0,
		options: [
			{ id: 'fire-death2-retry', text: 'Reintentar', icon: '🔄', isCorrect: true, feedback: '', points: 0, goTo: 'fire-1' },
			{ id: 'fire-death2-menu', text: 'Volver al menu', icon: '🏠', isCorrect: true, feedback: '', points: 0 }
		]
	}
];
