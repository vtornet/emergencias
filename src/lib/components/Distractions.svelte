<script lang="ts">
	import { X, PhoneIncoming, Bell, User } from 'lucide-svelte';
	import type { Distraction } from '$lib/types/distractions';

	// Props con sintaxis Svelte 5
	interface Props {
		distraction: Distraction | null;
		onDismiss?: () => void;
		onTimeout?: () => void;
		timeRemaining?: number;
	}

	let { distraction, onDismiss, onTimeout, timeRemaining = 0 }: Props = $props();

	// Estado reactivo interno
	let internalTime = $state(0);
	let callTimer = $state(10);

	// Sincronizar timeRemaining
	$effect(() => {
		internalTime = timeRemaining;
	});

	function dismiss() {
		if (distraction?.canDismiss) {
			onDismiss?.();
		}
	}

	function getTypeColor(type: string): string {
		switch (type) {
			case 'modal':
				return 'bg-orange-500';
			case 'notification':
				return 'bg-blue-500';
			case 'call':
				return 'bg-green-500';
			default:
				return 'bg-gray-500';
		}
	}
</script>

{#if distraction}
	<!-- Modal de distracción -->
	{#if distraction.type === 'modal'}
		<div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-slide-down">
			<div class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
				<!-- Header -->
				<div class="{getTypeColor(distraction.type)} text-white px-4 py-3 flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Bell size={20} />
						<span class="font-bold">{distraction.title}</span>
					</div>
					{#if distraction.canDismiss}
						<button onclick={dismiss} class="p-1 hover:bg-white/20 rounded-full">
							<X size={18} />
						</button>
					{/if}
				</div>

				<!-- Content -->
				<div class="p-6">
					<p class="text-gray-700 text-lg mb-4">{distraction.message}</p>

					{#if distraction.showTimer && distraction.duration}
						<div class="flex items-center gap-2 mb-4">
							<div class="flex-1 bg-gray-200 rounded-full h-3">
								<div
									class="h-3 rounded-full {getTypeColor(distraction.type)}"
									style="width: {(internalTime / (distraction.duration! / 1000)) * 100}%"
								></div>
							</div>
							<span class="text-sm font-mono text-gray-500">{Math.ceil(internalTime / 1000)}s</span>
						</div>
					{/if}

					<button
						onclick={dismiss}
						class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2"
					>
						<span>Cerrar y continuar</span>
						<X size={18} />
					</button>

					{#if distraction.points}
						<p class="text-center text-sm text-orange-600">+{distraction.points} puntos si aciertas ahora</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<!-- Notificación simulada -->
	{#if distraction.type === 'notification'}
		<div class="fixed top-4 right-4 z-40 max-w-sm animate-slide-down">
			<div class="bg-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden">
				<!-- Header -->
				<div class="px-4 py-3 bg-gray-800 flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Bell size={18} />
						<span class="font-medium text-sm">{distraction.app || 'Sistema'}</span>
					</div>
					{#if distraction.canDismiss}
						<button onclick={dismiss} class="p-1 hover:bg-gray-700 rounded-full">
							<X size={16} />
						</button>
					{/if}
				</div>

				<!-- Content -->
				<div class="p-4">
					<p class="font-medium">{distraction.title}</p>
					<p class="text-sm text-gray-300">{distraction.message}</p>

					{#if distraction.showTimer && distraction.duration}
						<div class="mt-3 flex items-center gap-2">
							<div class="flex-1 bg-gray-700 rounded-full h-2">
								<div
									class="h-2 rounded-full bg-blue-500"
									style="width: {(internalTime / (distraction.duration! / 1000)) * 100}%"
								></div>
							</div>
						</div>
					{/if}

					{#if distraction.points}
						<p class="text-xs text-green-400 mt-2">+{distraction.points} pts si aciertas</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<!-- Llamada entrante simulada -->
	{#if distraction.type === 'call'}
		<div class="fixed inset-0 bg-green-500 flex flex-col z-50 animate-slide-up">
			<!-- Header -->
			<div class="bg-green-600 text-white px-4 py-8 flex items-center justify-between">
				<div class="text-center">
					<PhoneIncoming size={32} class="animate-pulse" />
					<p class="text-2xl font-bold mt-2">Llamada entrante</p>
					<p class="text-green-200">{distraction.caller || 'Desconocido'}</p>
				</div>
			</div>

			<!-- Caller info -->
			<div class="flex-1 flex items-center justify-center p-8">
				<div class="text-center text-white">
					<div class="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
						<User size={64} class="text-white" />
					</div>
					<p class="text-3xl font-bold">{distraction.title}</p>
					<p class="text-green-100 text-xl">{distraction.message}</p>

					<!-- Timer -->
					{#if distraction.showTimer && distraction.duration}
						<div class="mt-6">
							<p class="text-2xl font-mono font-bold">{Math.ceil(callTimer / 10)}</p>
							<p class="text-sm text-green-200">segundos para decidir</p>
						</div>
					{/if}

					{#if distraction.points}
						<p class="text-sm text-green-300 mt-4">+{distraction.points} puntos bonus si rechazas</p>
					{/if}
				</div>
			</div>

			<!-- Actions -->
			<div class="bg-green-600 px-4 py-6 flex items-center justify-center gap-8">
				<button
					onclick={() => dismiss()}
					class="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg active:scale-95"
				>
					<X size={32} fill="white" />
				</button>
			</div>
		</div>
	{/if}
{/if}

<style>
	@keyframes slideUp {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes slideDown {
		from {
			transform: translateY(-100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.animate-slide-up {
		animation: slideUp 0.3s ease-out;
	}

	.animate-slide-down {
		animation: slideDown 0.3s ease-out;
	}

	@media (max-width: 640px) {
		.fixed.inset-0 {
			border-radius: 0;
		}
	}
</style>
