export type DistractionType = 'modal' | 'notification' | 'call';

export interface Distraction {
	id: string;
	type: DistractionType;
	title: string;
	message: string;
	app?: string; // para notificaciones: WhatsApp, Instagram, etc.
	caller?: string; // para llamadas
	duration?: number; // tiempo auto-cerrar en ms
	points?: number; // puntos bonus si aciertas con distracción activa
	canDismiss: boolean;
	showTimer?: boolean; // mostrar countdown
}

export interface DistractionResult {
	dismissed: boolean;
	timeTaken: number;
	pointsBonus?: number;
}
