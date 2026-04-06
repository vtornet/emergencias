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
				x: 11, // porcentaje desde la izquierda - torre del socorrista
				y: 11, // porcentaje desde arriba
				radius: 6, // porcentaje del ancho de la imagen - más pequeño
				nombre: 'Socorrista distrádo',
				feedback: 'El socorrista está en su torre de vigilancia pero mirando el móvil en lugar de vigilar el agua.',
				consecuencia: 'Si no vigila activamente, no puede reaccionar a tiempo ante un ahogamiento.'
			},
			{
				id: 2,
				x: 26, // personas bañándose con bandera roja visible
				y: 48,
				radius: 7,
				nombre: 'Baño con bandera roja',
				feedback: 'Hay bandera roja prohibiendo el baño, pero personas están bañándose igualmente.',
				consecuencia: 'Bandera roja indica condiciones peligrosas (corrientes, contaminación, presencia de medusas). Ignorarla puede ser fatal.'
			},
			{
				id: 3,
				x: 17, // niño solo en el agua abajo a la izquierda
				y: 76,
				radius: 6,
				nombre: 'Niño sin supervisión',
				feedback: 'Un niño juega solo en el agua mientras sus padres leen sin supervisarle.',
				consecuencia: 'Un niño puede ahogarse en segundos y nadie lo notaría. La supervisión activa es obligatoria.'
			},
			{
				id: 4,
				x: 58, // moto de agua en el agua a la derecha
				y: 68,
				radius: 7,
				nombre: 'Moto de agua cerca de la orilla',
				feedback: 'Vehículo acuático circulando muy cerca de la orilla (menos de 200m de distancia en tierra).',
				consecuencia: 'La distancia mínima de seguridad en tierra para navegar es de 200m con la costa. Menos distancia riesgo de colisión y fallecimientos.'
			},
			{
				id: 5,
				x: 78, // persona tocando medusa a la derecha
				y: 48,
				radius: 6,
				nombre: 'Persona tocando medusa',
				feedback: 'Persona agarrando una medusa del agua. Las medusas pueden causar picaduras graves incluso muertas.',
				consecuencia: 'Las picaduras de medusa pueden causar shock anafiláctico, parálisis e incluso la muerte por ahogamiento secundario.'
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
