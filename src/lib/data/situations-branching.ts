import type { Situation } from '$lib/types/game';

// Escenario: Parada Cardíaca en Centro Comercial
// Sistema ramificado "Elige tu propia historia"
export const cardiacArrestSituations: Situation[] = [
	// ============================================
	// CARDIAC-1 [INICIO]
	// ============================================
	{
		id: 'cardiac-1',
		type: 'decision',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'Una persona de 65 años se ha desplomado repentinamente frente a ti. No responde cuando le hablas y no se mueve. Hay gente alrededor mirando pero nadie actúa.',
		victimStatus: 'very-critical',
		image: '/images/scenarios/cardiac-1.png',
		timeLimit: 45,
		options: [
			{
				id: 'cardiac-1-a',
				text: 'Llamar al 112 inmediatamente',
				icon: '📞',
				isCorrect: false,
				feedback:
					'El 112 es importante, pero cada segundo sin RCP reduce un 10% las posibilidades de supervivencia. Has perdido tiempo valioso.',
				points: 0,
				goTo: 'cardiac-1a'
			},
			{
				id: 'cardiac-1-b',
				text: 'Iniciar compresiones torácicas (RCP) inmediatamente',
				icon: '👐',
				isCorrect: true,
				feedback:
					'¡Excelente! Iniciar RCP inmediatamente es lo correcto. Mantienes la circulación sanguínea al cerebro y órganos vitales.',
				points: 100,
				timeBonus: 50,
				goTo: 'cardiac-1b'
			},
			{
				id: 'cardiac-1-c',
				text: 'Buscar un DEA cerca',
				icon: '🔌',
				isCorrect: false,
				feedback:
					'El DEA es importante, pero primero debes mantener la circulación con RCP. Perder tiempo buscando el DEA sin hacer RCP reduce las posibilidades de supervivencia.',
				points: 0,
				goTo: 'cardiac-1c'
			},
			{
				id: 'cardiac-1-d',
				text: 'Poner a la persona en posición lateral de seguridad',
				icon: '🛏️',
				isCorrect: false,
				feedback:
					'La posición lateral es para personas inconscientes que respiran. Esta persona está en parada cardíaca y no respira. Esta decisión ha sido fatal.',
				points: 0,
				goTo: 'cardiac-gameover-lateral'
			}
		],
		tip: {
			text: 'La cadena de supervivencia prioriza: RCP inmediato → Llamar emergencias → DEA',
			cost: 10
		}
	},

	// ============================================
	// CARDIAC-1A [Perdió tiempo llamando]
	// ============================================
	{
		id: 'cardiac-1a',
		type: 'decision',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'❌ Has perdido 30 segundos valiosos llamando primero al 112. La víctima ha empeorado. Una persona del público grita: "¡Creo que hay un DEA en la entrada!"\n\n¿Qué haces ahora?',
		victimStatus: 'critical',
		image: '/images/scenarios/cardiac-1-wrong.svg',
		timeLimit: 30,
		options: [
			{
				id: 'cardiac-1a-a',
				text: 'Correr a buscar el DEA ahora',
				icon: '🏃',
				isCorrect: false,
				feedback:
					'Perdiste aún más tiempo. El DEA sirve si hay alguien haciendo RCP mientras tanto. Sin RCP, la víctima sufre daño cerebral irreversible.',
				points: 0,
				goTo: 'cardiac-1a-dea'
			},
			{
				id: 'cardiac-1a-b',
				text: 'Iniciar RCP ya y pedir a otro que busque el DEA',
				icon: '👐',
				isCorrect: true,
				feedback:
					'¡Correcto! Es la única opción viable ahora. Tú haces RCP y delegas la búsqueda del DEA a otra persona. La víctima tiene una oportunidad.',
				points: 50,
				goTo: 'cardiac-2'
			},
			{
				id: 'cardiac-1a-c',
				text: 'Seguir hablando con el 112',
				icon: '📞',
				isCorrect: false,
				feedback:
					'Sin RCP, la víctima no llegará con vida a que llegue la ambulancia. El retraso acumulado ha sido fatal.',
				points: 0,
				goTo: 'cardiac-gameover-delay'
			}
		]
	},

	// ============================================
	// CARDIAC-1B [RCP iniciado correctamente]
	// ============================================
	{
		id: 'cardiac-1b',
		type: 'decision',
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
				id: 'cardiac-1b-a',
				text: 'Seguir con RCP hasta que termine de llegar el DEA',
				icon: '👐',
				isCorrect: true,
				feedback:
					'¡Perfecto! Mantienes las compresiones hasta que el DEA esté listo. Minimizar las interrupciones es clave.',
				points: 100,
				goTo: 'cardiac-2'
			},
			{
				id: 'cardiac-1b-b',
				text: 'Parar RCP inmediatamente y esperar al DEA',
				icon: '⏸️',
				isCorrect: false,
				feedback:
					'Has detenido las compresiones antes de tiempo. El ritmo cardíaco se ha perdido y cada segundo sin circulación cuenta.',
				points: 30,
				goTo: 'cardiac-2a'
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

	// ============================================
	// CARDIAC-1C [Fue a buscar DEA primero]
	// ============================================
	{
		id: 'cardiac-1c',
		type: 'decision',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'❌ Vuelves con el DEA. Han pasado 45 segundos. La víctima no se mueve y no respira. Has perdido demasiado tiempo sin hacer RCP.\n\n¿Qué haces?',
		victimStatus: 'critical',
		image: '/images/scenarios/cardiac-1-wrong.svg',
		timeLimit: 20,
		options: [
			{
				id: 'cardiac-1c-a',
				text: 'Usar el DEA ahora mismo',
				icon: '🔌',
				isCorrect: false,
				feedback:
					'El DEA indica "NO SE RECOMIENDA SHOCK". Sin RCP previa, el corazón está demasiado deteriorado.',
				points: 0,
				goTo: 'cardiac-1a-dea'
			},
			{
				id: 'cardiac-1c-b',
				text: 'Iniciar RCP primero',
				icon: '👐',
				isCorrect: true,
				feedback:
					'Bien, mejor tarde que nunca. Empiezas RCP pero el tiempo perdido ha sido crítico.',
				points: 30,
				goTo: 'cardiac-2'
			},
			{
				id: 'cardiac-1c-c',
				text: 'Llamar al 112 ahora',
				icon: '📞',
				isCorrect: false,
				feedback:
					'Sin RCP, es demasiado tarde. La víctima ha sufrido daño irreversible por el tiempo perdido.',
				points: 0,
				goTo: 'cardiac-gameover-delay'
			}
		]
	},

	// ============================================
	// CARDIAC-1A-DEA [Situación crítica después de errores]
	// ============================================
	{
		id: 'cardiac-1a-dea',
		type: 'decision',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'⚠️ El DEA dice: "NO SE RECOMIENDA SHOCK". La víctima lleva demasiado tiempo sin RCP. Su estado es crítico.\n\n¿Qué haces?',
		victimStatus: 'very-critical',
		image: '/images/scenarios/cardiac-2-wrong.svg',
		timeLimit: 15,
		options: [
			{
				id: 'cardiac-1adea-a',
				text: 'Iniciar RCP urgentemente',
				icon: '👐',
				isCorrect: true,
				feedback:
					'Es tu única oportunidad. Empiezas RCP pero el tiempo perdido puede haber causado daño irreversible.',
				points: 30,
				goTo: 'cardiac-2'
			},
			{
				id: 'cardiac-1adea-b',
				text: 'Esperar a que llegue la ambulancia',
				icon: '🚑',
				isCorrect: false,
				feedback:
					'Sin RCP, la víctima no llegará viva. La ambulancia tardará varios minutos.',
				points: 0,
				goTo: 'cardiac-gameover-delay'
			}
		]
	},

	// ============================================
	// CARDIAC-2A [Paró RCP antes de tiempo]
	// ============================================
	{
		id: 'cardiac-2a',
		type: 'decision',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'❌ Detuviste las compresiones antes de tiempo. El DEA está listo pero el ritmo cardíaco se ha perdido.\n\nEl DEA dice: "SHOCK RECOMENDADO".',
		victimStatus: 'critical',
		image: '/images/scenarios/cardiac-2-wrong.svg',
		timeLimit: 15,
		options: [
			{
				id: 'cardiac-2a-a',
				text: 'Administrar el shock y reiniciar RCP urgentemente',
				icon: '⚡',
				isCorrect: true,
				feedback:
					'Bien, administro el shock. Reinicias RCP pero la interrupción ha costado caro.',
				points: 50,
				goTo: 'cardiac-3'
			},
			{
				id: 'cardiac-2a-b',
				text: 'Administrar shock y esperar',
				icon: '👀',
				isCorrect: false,
				feedback:
					'El shock está administrado, pero después de un shock SIEMPRE hay que continuar RCP inmediatamente.',
				points: 0,
				goTo: 'cardiac-3b'
			}
		]
	},

	// ============================================
	// CARDIAC-2 [RCP en marcha + DEA listo]
	// ============================================
	{
		id: 'cardiac-2',
		type: 'decision',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'🔌 El DEA está listo. Tú has estado haciendo RCP correctamente.\n\nEl DEA analiza y dice: "SHOCK RECOMENDADO".',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-3.png',
		timeLimit: 10,
		options: [
			{
				id: 'cardiac-2-a',
				text: 'Administrar shock y continuar RCP después',
				icon: '⚡',
				isCorrect: true,
				feedback:
					'¡Perfecto! Administro el shock y continúas RCP inmediatamente después. Mantienes la cadena de supervivencia.',
				points: 100,
				goTo: 'cardiac-3'
			},
			{
				id: 'cardiac-2-b',
				text: 'Administrar shock y esperar a ver si responde',
				icon: '👀',
				isCorrect: false,
				feedback:
					'Después de un shock SIEMPRE hay que continuar RCP inmediatamente. Esperar pierde segundos vitales.',
				points: 30,
				goTo: 'cardiac-3b'
			}
		]
	},

	// ============================================
	// CARDIAC-3 [RCP continua después del shock]
	// ============================================
	{
		id: 'cardiac-3',
		type: 'decision',
		emergency: {
			title: 'Parada Cardíaca',
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
				id: 'cardiac-3-a',
				text: 'Detener RCP y colocarla en posición lateral',
				icon: '🛏️',
				isCorrect: true,
				feedback:
					'¡Excelente! La víctima ha recuperado circulación espontánea. Posición lateral y vigilar hasta que llegue la ambulancia.',
				points: 100,
				goTo: 'cardiac-4-victory'
			},
			{
				id: 'cardiac-3-b',
				text: 'Seguir con RCP "por si acaso"',
				icon: '👐',
				isCorrect: false,
				feedback:
					'Hacer RCP a alguien que respira y tiene pulso puede causarles daño. Si respira y se mueve, detente.',
				points: 0,
				goTo: 'cardiac-4-partial-b'
			},
			{
				id: 'cardiac-3-c',
				text: 'Incorporarla a sentada',
				icon: '🪑',
				isCorrect: false,
				feedback:
					'Incorporarla puede ser peligroso si está débil o tiene lesiones cervicales. Mejor dejarla en el suelo.',
				points: 0,
				goTo: 'cardiac-4-partial-c'
			}
		],
		distractors: [
			{
				type: 'text',
				content: '👤 "¡Ya se movió! ¿Paramos?"'
			}
		]
	},

	// ============================================
	// CARDIAC-3B [Esperó después del shock]
	// ============================================
	{
		id: 'cardiac-3b',
		type: 'decision',
		emergency: {
			title: 'Parada Cardíaca',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🚨'
		},
		description:
			'❌ Has perdido segundos críticos esperando después del shock. La víctima tose débilmente y respira con dificultad.\n\n¿Qué haces?',
		victimStatus: 'critical',
		image: '/images/scenarios/cardiac-3-wrong.svg',
		timeLimit: 10,
		options: [
			{
				id: 'cardiac-3b-a',
				text: 'Colocar en posición lateral y vigilar',
				icon: '🛏️',
				isCorrect: true,
				feedback:
					'Bien, la víctima sobrevive pero el retraso ha podido causar daño. Llegan los sanitarios.',
				points: 50,
				goTo: 'cardiac-4-partial'
			},
			{
				id: 'cardiac-3b-b',
				text: 'Reiniciar RCP',
				icon: '👐',
				isCorrect: false,
				feedback:
					'La víctima ya está respirando. Hacer RCP ahora podría causar daño. Solo vigila.',
				points: 0,
				goTo: 'cardiac-4-partial'
			}
		]
	},

	// ============================================
	// CARDIAC-4-VICTORY [Camino hacia victoria]
	// ============================================
	{
		id: 'cardiac-4-victory',
		type: 'decision',
		emergency: {
			title: 'Recuperación',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🏥'
		},
		description:
			'🏥 La víctima está en posición lateral, respirando. Llegan los servicios de emergencia.\n\nEl sanitario a cargo te dice: "Has actuado correctamente. Tu intervención ha sido clave".',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-victory.png',
		timeLimit: 0,
		options: [
			{
				id: 'cardiac-4v-a',
				text: 'Entregar a los sanitarios',
				icon: '🚑',
				isCorrect: true,
				feedback: 'Los sanitarios se hacen cargo. La víctima llegará al hospital estable.',
				points: 50,
				goTo: 'cardiac-victoria-completa'
			}
		]
	},

	// ============================================
	// CARDIAC-4-PARTIAL-B [Siguió RCP innecesariamente]
	// ============================================
	{
		id: 'cardiac-4-partial-b',
		type: 'decision',
		emergency: {
			title: 'Recuperación',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '⚠️'
		},
		description:
			'⚠️ La víctima grita de dolor porque seguiste haciendo RCP cuando ya respiraba. Llegan los sanitarios.\n\nLe explicas lo sucedido. Te miran con preocupación.',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-4-wrong.svg',
		timeLimit: 0,
		options: [
			{
				id: 'cardiac-4pb-a',
				text: 'Entregar a los sanitarios',
				icon: '🚑',
				isCorrect: true,
				feedback:
					'La víctima sobrevive, pero has cometido un error al continuar RCP innecesariamente.',
				points: 30,
				goTo: 'cardiac-victoria-parcial'
			}
		]
	},

	// ============================================
	// CARDIAC-4-PARTIAL-C [Incorporó a la víctima]
	// ============================================
	{
		id: 'cardiac-4-partial-c',
		type: 'decision',
		emergency: {
			title: 'Recuperación',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '⚠️'
		},
		description:
			'⚠️ La víctima se mareó y casi vuelve a caer cuando la incorporaste. Llegan los sanitarios.\n\nLe explicas lo sucedido. Te dicen que tenías que dejarla en el suelo.',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-4-wrong.svg',
		timeLimit: 0,
		options: [
			{
				id: 'cardiac-4pc-a',
				text: 'Entregar a los sanitarios',
				icon: '🚑',
				isCorrect: true,
				feedback:
					'La víctima sobrevive, pero has cometido un error al incorporarla sin estar indicado.',
				points: 30,
				goTo: 'cardiac-victoria-parcial'
			}
		]
	},

	// ============================================
	// CARDIAC-4-PARTIAL [Victoria parcial genérica]
	// ============================================
	{
		id: 'cardiac-4-partial',
		type: 'decision',
		emergency: {
			title: 'Recuperación',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '⚠️'
		},
		description:
			'⚠️ La víctima sobrevive pero has cometido errores durante el proceso. Llegan los sanitarios.\n\nEl sanitario te dice: "La víctima está estable, pero repasa el protocolo".',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-4-wrong.svg',
		timeLimit: 0,
		options: [
			{
				id: 'cardiac-4p-a',
				text: 'Entregar a los sanitarios',
				icon: '🚑',
				isCorrect: true,
				feedback:
					'La víctima sobrevive con secuelas por el retraso. Has aprendido la importancia de actuar rápido.',
				points: 30,
				goTo: 'cardiac-victoria-parcial'
			}
		]
	},

	// ============================================
	// FINALES
	// ============================================

	// Victoria Completa
	{
		id: 'cardiac-victoria-completa',
		type: 'final',
		finalType: 'victoria-completa',
		emergency: {
			title: '¡Misión Cumplida!',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '🎉'
		},
		description:
			'🏆¡VICTORIA COMPLETA!\n\nLos servicios de emergencia se han hecho cargo de la víctima. Gracias a tu actuación rápida y correcta, la persona ha sobrevivido sin secuelas.\n\nEl sanitario a cargo te dice: "Has hecho todo perfecto. Sin tu intervención, esta persona no estaría viva hoy."\n\n🎖️ Has completado el camino ideal de la cadena de supervivencia.',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-victory.png',
		timeLimit: 0,
		options: [
			{
				id: 'go-retry',
				text: 'Jugar de nuevo',
				icon: '🔄',
				isCorrect: true,
				feedback: '',
				points: 0,
				goTo: 'cardiac-1'
			},
			{
				id: 'go-menu',
				text: 'Volver al inicio',
				icon: '🏠',
				isCorrect: true,
				feedback: '',
				points: 0
			}
		]
	},

	// Victoria Parcial
	{
		id: 'cardiac-victoria-parcial',
		type: 'final',
		finalType: 'victoria-parcial',
		emergency: {
			title: 'Misión Completada (con errores)',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '⚠️'
		},
		description:
			'🟡 VICTORIA PARCIAL\n\nLa víctima ha sobrevivido, pero cometiste errores que podrían haber sido fatales.\n\nEl sanitario te recomienda: "Repasa el protocolo de RCP. Cada segundo sin compresiones reduce un 10% las posibilidades de supervivencia."\n\n📚 Aprendizaje: La rapidez y la secuencia correcta son vitales en una parada cardíaca.',
		victimStatus: 'stable',
		image: '/images/scenarios/cardiac-4-wrong.svg',
		timeLimit: 0,
		options: [
			{
				id: 'go-retry',
				text: 'Intentar de nuevo',
				icon: '🔄',
				isCorrect: true,
				feedback: '',
				points: 0,
				goTo: 'cardiac-1'
			},
			{
				id: 'go-menu',
				text: 'Volver al inicio',
				icon: '🏠',
				isCorrect: true,
				feedback: '',
				points: 0
			}
		]
	},

	// Game Over - Posición lateral incorrecta
	{
		id: 'cardiac-gameover-lateral',
		type: 'final',
		finalType: 'gameover',
		emergency: {
			title: 'Misión Fallida',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '💀'
		},
		description:
			'❌ GAME OVER\n\nPusiste a la víctima en posición lateral cuando estaba en parada cardíaca. Esto no ayuda y pierde segundos vitales.\n\nLa posición lateral es para personas inconscientes que RESPIRAN. En parada cardíaca se necesita RCP URGENTE.\n\n💀 La víctima no ha sobrevivido.\n\n📚 Recuerda: Si no responde y no respira → RCP INMEDIATO.',
		victimStatus: 'deceased',
		image: '/images/scenarios/cardiac-gameover.svg',
		timeLimit: 0,
		options: [
			{
				id: 'go-retry',
				text: 'Intentar de nuevo',
				icon: '🔄',
				isCorrect: true,
				feedback: '',
				points: 0,
				goTo: 'cardiac-1'
			},
			{
				id: 'go-menu',
				text: 'Volver al menú',
				icon: '🏠',
				isCorrect: true,
				feedback: '',
				points: 0,
				goTo: 'menu'
			}
		]
	},

	// Game Over - Demora excesiva
	{
		id: 'cardiac-gameover-delay',
		type: 'final',
		finalType: 'gameover',
		emergency: {
			title: 'Misión Fallida',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '💀'
		},
		description:
			'❌ GAME OVER\n\nPerdiste demasiado tiempo sin iniciar RCP. En una parada cardíaca, cada segundo sin compresiones reduce un 10% las posibilidades de supervivencia.\n\nLlamaste al 112, buscaste el DEA, esperaste... pero nunca iniciaste RCP a tiempo.\n\n💀 La víctima ha sufrido daño cerebral irreversible y no ha sobrevivido.\n\n📚 Recuerda: RCP ANTES de todo lo demás. El resto puede esperar.',
		victimStatus: 'deceased',
		image: '/images/scenarios/cardiac-gameover.svg',
		timeLimit: 0,
		options: [
			{
				id: 'go-retry',
				text: 'Intentar de nuevo',
				icon: '🔄',
				isCorrect: true,
				feedback: '',
				points: 0,
				goTo: 'cardiac-1'
			},
			{
				id: 'go-menu',
				text: 'Volver al menú',
				icon: '🏠',
				isCorrect: true,
				feedback: '',
				points: 0,
				goTo: 'menu'
			}
		]
	},

	// Game Over - Timeout
	{
		id: 'cardiac-gameover-timeout',
		type: 'final',
		finalType: 'gameover',
		emergency: {
			title: 'Tiempo Agotado',
			location: 'Centro Comercial - Planta Baja',
			type: 'Médica',
			icon: '⏰'
		},
		description:
			'❌ TIEMPO AGOTADO\n\nNo actuaste a tiempo. En una emergencia médica, la indecisión puede ser fatal.\n\n💀 La víctima no ha sobrevivido por falta de acción rápida.\n\n📚 En emergencias: ACTÚA primero, duda después. RCP inmediato salva vidas.',
		victimStatus: 'deceased',
		image: '/images/scenarios/cardiac-gameover.svg',
		timeLimit: 0,
		options: [
			{
				id: 'go-retry',
				text: 'Intentar de nuevo',
				icon: '🔄',
				isCorrect: true,
				feedback: '',
				points: 0,
				goTo: 'cardiac-1'
			},
			{
				id: 'go-menu',
				text: 'Volver al menú',
				icon: '🏠',
				isCorrect: true,
				feedback: '',
				points: 0,
				goTo: 'menu'
			}
		]
	}
];

// Mapa de situaciones por ID para fácil acceso
export const cardiacSituationsMap = new Map<string, Situation>();
cardiacArrestSituations.forEach((s) => cardiacSituationsMap.set(s.id, s));
