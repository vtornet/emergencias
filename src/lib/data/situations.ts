import type { Situation, AvailableSituation } from '$lib/types/game';
import { fireSituations } from './fire-situations';

// Escenario: Parada Cardíaca en Centro Comercial
export const cardiacArrestSituations: Situation[] = [
	{
		id: 'cardiac-1',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'Una persona de 65 años se ha desplomado repentinamente frente a ti. No responde cuando le hablas y no se mueve. Hay gente alrededor mirando pero nadie actúa.',
		victimStatus: 'very-critical',
		image: '/images/scenarios/cardiac-arrest.png',
		timeLimit: 45,
		options: [
			{
				id: 'cardiac-1-a',
				text: 'Llamar al 112 inmediatamente',
				icon: '📞',
				isCorrect: false,
				feedback:
					'El 112 es importante, pero cada segundo sin RCP reduce un 10% las posibilidades de supervivencia. La primera prioridad es iniciar compresiones torácicas.',
				points: 0,
				leadsTo: 'cardiac-1-wrong'
			},
			{
				id: 'cardiac-1-b',
				text: 'Iniciar compresiones torácicas (RCP) inmediatamente',
				icon: '👐',
				isCorrect: true,
				feedback:
					'¡Excelente! Iniciar RCP inmediatamente es lo correcto. Mantienes la circulación sanguínea al cerebro y órganos vitales. Cada segundo cuenta.',
				points: 100,
				timeBonus: 50,
				leadsTo: 'cardiac-2'
			},
			{
				id: 'cardiac-1-c',
				text: 'Buscar un DEA cerca',
				icon: '🔌',
				isCorrect: false,
				feedback:
					'El DEA es importante, pero primero debes mantener la circulación con RCP. Perder tiempo buscando el DEA sin hacer RCP reduce las posibilidades de supervivencia.',
				points: 0,
				leadsTo: 'cardiac-1-wrong'
			},
			{
				id: 'cardiac-1-d',
				text: 'Poner a la persona en posición lateral de seguridad',
				icon: '🛏️',
				isCorrect: false,
				feedback:
					'La posición lateral es para personas inconscientes que respiran. Esta persona NO respira y está en parada cardíaca. Necesita RCP urgente.',
				points: 0,
				leadsTo: 'cardiac-1-wrong'
			}
		],
		tip: {
			text: 'La cadena de supervivencia prioriza: RCP inmediato → Llamar emergencias → DEA',
			cost: 10
		}
	},
	{
		id: 'cardiac-1-wrong',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'❌ DECISIÓN INCORRECTA\n\nLa víctima ha perdido tiempo valioso. Su estado ha empeorado. Una persona del público grita: "¡Creo que hay un DEA en la entrada!"\n\n¿Qué haces ahora?',
		victimStatus: 'critical',
		image: '/images/scenarios/cardiac-1-wrong.svg',
		timeLimit: 30,
		options: [
			{
				id: 'cardiac-1w-a',
				text: 'Correr a buscar el DEA',
				icon: '🏃',
				isCorrect: false,
				feedback:
					'Perdiste más tiempo. El DEA sirve si hay alguien haciendo RCP mientras tanto. Sin RCP, la víctima sufre daño cerebral irreversible.',
				points: 0,
				leadsTo: 'cardiac-gameover'
			},
			{
				id: 'cardiac-1w-b',
				text: 'Iniciar RCP ya y pedir a otro que busque el DEA',
				icon: '👐',
				isCorrect: true,
				feedback:
					'¡Correcto! Es la única opción. Tú haces RCP y delegas la búsqueda del DEA a otra persona. La víctima tiene una oportunidad.',
				points: 50,
				leadsTo: 'cardiac-2'
			},
			{
				id: 'cardiac-1w-c',
				text: 'Llamar al 112 ahora',
				icon: '📞',
				isCorrect: false,
				feedback:
					'Sin RCP, la víctima no llegará viva a que llegue la ambulancia. El retraso ha sido fatal.',
				points: 0,
				leadsTo: 'cardiac-gameover'
			}
		]
	},
	{
		id: 'cardiac-2',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'✅ Estás haciendo RCP correctamente. Una persona joven te dice: "Yo llamo a emergencias".\n\nDe repente, escuchas que llega el DEA que fue a buscar otra persona.',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-2.png',
		timeLimit: 20,
		options: [
			{
				id: 'cardiac-2-a',
				text: 'Detener RCP inmediatamente y usar el DEA',
				icon: '🔌',
				isCorrect: true,
				feedback:
					'¡Perfecto! El DEA analiza el ritmo y te dirá qué hacer. Mantener un mínimo de interrupciones es clave.',
				points: 100,
				leadsTo: 'cardiac-3'
			},
			{
				id: 'cardiac-2-b',
				text: 'Seguir con RCP, el DEA puede esperar',
				icon: '👐',
				isCorrect: false,
				feedback:
					'El DEA es esencial. Aunque la RCP mantiene circulación, solo un shock eléctrico puede restaurar un ritmo cardíaco normal en muchos casos.',
				points: 0,
				leadsTo: 'cardiac-2-wrong'
			},
			{
				id: 'cardiac-2-c',
				text: 'Dejar que otro use el DEA mientras sigues con RCP',
				icon: '👥',
				isCorrect: false,
				feedback:
					'Es imposible hacer RCP y usar el DEA al mismo tiempo en la misma víctima. Debes detener las compresiones para aplicar los parches.',
				points: 0,
				leadsTo: 'cardiac-2-wrong'
			}
		],
		distractors: [
			{
				type: 'audio',
				content: '📱 Teléfono sonando'
			},
			{
				type: 'text',
				content: '👤 "¡Yo sé primero auxilios!" (grita alguien del público)'
			}
		]
	},
	{
		id: 'cardiac-2-wrong',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'❌ Has perdido tiempo valioso. El DEA estaba ahí y no lo usaste. La víctima ha empeorado.\n\n¿Te detienes y usas el DEA ahora?',
		victimStatus: 'critical',
		image: '/images/scenarios/cardiac-2-wrong.svg',
		timeLimit: 15,
		options: [
			{
				id: 'cardiac-2w-a',
				text: 'Sí, usar el DEA ahora',
				icon: '🔌',
				isCorrect: true,
				feedback:
					'Bien, mejor tarde que nunca. El DEA podría todavía restaurar el ritmo cardíaco.',
				points: 50,
				leadsTo: 'cardiac-3'
			},
			{
				id: 'cardiac-2w-b',
				text: 'Seguir con RCP hasta que llegue la ambulancia',
				icon: '👨‍⚕️',
				isCorrect: false,
				feedback:
					'La ambulancia tardará varios minutos. Sin el DEA, las posibilidades de supervivencia disminuyen drásticamente.',
				points: 0,
				leadsTo: 'cardiac-gameover'
			}
		]
	},
	{
		id: 'cardiac-3',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'🔌 El DEA indica: "SHOCK RECOMENDADO". Se ha descargado el shock.\n\nEl DEA ahora dice: "Continuar RCP si es necesario".',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-3.png',
		timeLimit: 10,
		options: [
			{
				id: 'cardiac-3-a',
				text: 'Reiniciar RCP inmediatamente',
				icon: '👐',
				isCorrect: true,
				feedback:
					'¡Correcto! Después del shock, debes continuar con RCP inmediatamente. El corazón necesita "masajearse" para recuperarse.',
				points: 100,
				leadsTo: 'cardiac-4'
			},
			{
				id: 'cardiac-3-b',
				text: 'Esperar y ver si responde',
				icon: '👀',
				isCorrect: false,
				feedback:
					'Nunca esperas después de un shock. Debes continuar con RCP hasta que la víctima se mueva o respire, o lleguen los servicios de emergencia.',
				points: 0,
				leadsTo: 'cardiac-3-wrong'
			},
			{
				id: 'cardiac-3-c',
				text: 'Dar otro shock inmediatamente',
				icon: '⚡',
				isCorrect: false,
				feedback:
					'El DEA te dirá cuándo dar otro shock. No debes dar shocks consecutivos sin seguir las instrucciones del dispositivo.',
				points: 0,
				leadsTo: 'cardiac-3-wrong'
			}
		],
		distractors: [
			{
				type: 'text',
				content: '👤 "¡Ya se movió! ¿Paramos?"'
			}
		]
	},
	{
		id: 'cardiac-3-wrong',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'❌ Perdiste segundos críticos. El corazón necesitaba circulación inmediata tras el shock.\n\n¿Qué haces?',
		victimStatus: 'critical',
		image: '/images/scenarios/cardiac-3-wrong.svg',
		timeLimit: 10,
		options: [
			{
				id: 'cardiac-3w-a',
				text: 'Reiniciar RCP ahora mismo',
				icon: '👐',
				isCorrect: true,
				feedback: 'Bien, recuperes el ritmo. La víctima aún tiene oportunidad.',
				points: 50,
				leadsTo: 'cardiac-4'
			},
			{
				id: 'cardiac-3w-b',
				text: 'Esperar a la ambulancia',
				icon: '🚑',
				isCorrect: false,
				feedback: 'Sin RCP, no llegará con vida.',
				points: 0,
				leadsTo: 'cardiac-gameover'
			}
		]
	},
	{
		id: 'cardiac-4',
		emergency: {
			title: 'Parada Cardíaco',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'🔄 Llevas 2 minutos de RCP continua después del shock. De repente, la víctima tose y mueve la cabeza. Empieza a respirar.\n\n¿Qué haces?',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-4.png',
		timeLimit: 15,
		options: [
			{
				id: 'cardiac-4-a',
				text: 'Colocarla en posición lateral y vigilar',
				icon: '🛏️',
				isCorrect: true,
				feedback:
					'¡Perfecto! La víctima ha recuperado circulación espontánea. Ahora debes mantener la vía abierta en posición lateral y vigilar que siga respirando hasta que llegue la ambulancia.',
				points: 100,
				leadsTo: 'cardiac-victory'
			},
			{
				id: 'cardiac-4-b',
				text: 'Seguir con RCP "por si acaso"',
				icon: '👐',
				isCorrect: false,
				feedback:
					'Hacer RCP a alguien que respira y tiene pulso puede causarles daño. Si respira y se mueve, detente y vigila.',
				points: 0,
				leadsTo: 'cardiac-4-wrong'
			},
			{
				id: 'cardiac-4-c',
				text: 'Incorporarla a sentada',
				icon: '🪑',
				isCorrect: false,
				feedback:
					'Incorporarla puede ser peligroso si está débil o tiene lesiones cervicales. Mejor dejarla en el suelo y vigilar.',
				points: 0,
				leadsTo: 'cardiac-4-wrong'
			}
		]
	},
	{
		id: 'cardiac-4-wrong',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'⚠️ La víctima sigue respirando pero tu acción ha causado estrés adicional. Afortunadamente, llegan los sanitarios.',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-4-wrong.svg',
		timeLimit: 0,
		options: [
			{
				id: 'cardiac-4w-a',
				text: 'Entregar a los sanitarios y finalizar',
				icon: '🚑',
				isCorrect: true,
				feedback:
					'Los sanitarios se hacen cargo. La víctima sobrevive, pero cometiste un error al final.',
				points: 50,
				leadsTo: 'cardiac-victory'
			}
		]
	},
	{
		id: 'cardiac-victory',
		emergency: {
			title: '¡Misión Completada!',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🎉'
		},
		description:
			'🏥 Los servicios de emergencia se han hecho cargo de la víctima. Gracias a tu actuación, la persona ha sobrevivido.\n\nEl sanitario a cargo te dice: "Has hecho todo lo correcto. Sin tu intervención rápida, esta persona no estaría viva hoy."\n\n¡Enhorabuena, socorrista!',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-victory.png',
		timeLimit: 0,
		options: [
			{
				id: 'victory-continue',
				text: 'Continuar',
				icon: '➡️',
				isCorrect: true,
				feedback: '',
				points: 200
			}
		]
	},
	{
		id: 'cardiac-gameover',
		emergency: {
			title: 'Misión Fallida',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '💀'
		},
		description:
			'❌ A pesar de tus esfuerzos, la víctima no ha sobrevivido. Los servicios de emergencia confirman el fallecimiento.\n\nEl coordinador del servicio de emergencias te dice: "Has cometido errores críticos en la cadena de supervivencia. Te recomiendo repasar el protocolo de RCP y DEA".\n\n¿Quieres intentarlo de nuevo?',
		victimStatus: 'deceased',
		image: '/images/scenarios/cardiac-gameover.svg',
		timeLimit: 0,
		options: [
			{
				id: 'gameover-retry',
				text: 'Intentar de nuevo',
				icon: '🔄',
				isCorrect: true,
				feedback: '',
				points: 0
			},
			{
				id: 'gameover-menu',
				text: 'Volver al menú',
				icon: '🏠',
				isCorrect: true,
				feedback: '',
				points: 0
			}
		]
	}
];

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
