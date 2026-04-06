import type { FindErrorsGame } from '$lib/types/game';

export const findErrorsGames: FindErrorsGame[] = [
	{
		id: 'beach-01',
		title: 'Vigilancia Playa',
		description: 'Identifica los 5 peligros en esta playa concurrida. Tienes 45 segundos.',
		image: '/images/find-errors/find-errors-01.png',
		imageWithSolution: '/images/find-errors/find-errors-01-1.png',
		timeLimit: 45,
		pointsPerError: 50,
		bonusUnder30s: 100,
		difficulty: 'intermediate',
		errores: [
			{
				id: 1,
				x: 32, // Socorrista - un pelín más a la derecha
				y: 14,
				radius: 8,
				nombre: 'Socorrista distrádo',
				feedback: 'El socorrista está en su torre de vigilancia pero mirando el móvil en lugar de vigilar el agua.',
				consecuencia: 'Si no vigila activamente, no puede reaccionar a tiempo ante un ahogamiento.'
			},
			{
				id: 2,
				x: 75, // Moto de agua - más a la derecha y abajo
				y: 40,
				radius: 8,
				nombre: 'Moto de agua cerca de la orilla',
				feedback: 'Vehículo acuático circulando muy cerca de la orilla (menos de 200m de distancia en tierra).',
				consecuencia: 'La distancia mínima de seguridad en tierra para navegar es de 200m con la costa. Menos distancia riesgo de colisión y fallecimientos.'
			},
			{
				id: 3,
				x: 67, // Niña con Medusa - más a la derecha y abajo
				y: 47,
				radius: 8,
				nombre: 'Persona tocando medusa',
				feedback: 'Persona agarrando una medusa del agua. Las medusas pueden causar picaduras graves incluso muertas.',
				consecuencia: 'Las picaduras de medusa pueden causar shock anafiláctico, parálisis e incluso la muerte por ahogamiento secundario.'
			},
			{
				id: 4,
				x: 30, // Niño sin supervisión (padres distraídos) - bastante más abajo
				y: 55,
				radius: 8,
				nombre: 'Niño sin supervisión',
				feedback: 'Un niño juega solo mientras sus padres leen sin supervisarle.',
				consecuencia: 'Un niño puede ahogarse en segundos y nadie lo notaría. La supervisión activa es obligatoria.'
			},
			{
				id: 5,
				x: 82, // Bañistas con bandera roja - más a la derecha y abajo
				y: 50,
				radius: 8,
				nombre: 'Baño con bandera roja',
				feedback: 'Hay bandera roja prohibiendo el baño, pero personas están bañándose igualmente.',
				consecuencia: 'Bandera roja indica condiciones peligrosas (corrientes, contaminación, presencia de medusas). Ignorarla puede ser fatal.'
			}
		],
		summary: {
			titulo: 'Peligros en la Playa',
			aprendizaje: [
				'La distracción del socorrista es una de las principales causas de ahogamiento en piscinas y playas.',
				'Las banderas rojas deben respetarse siempre, indican peligro real.',
				'Los niños deben estar supervisados activamente en todo momento en el agua.',
				'Las motos de agua deben respetar la distancia de seguridad de 200m con la costa.',
				'Nunca tocar una medusa; si la ves, avisa al socorrista.'
			]
		}
	}
];
