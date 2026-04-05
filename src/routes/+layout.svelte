<script lang="ts">
	import '../lib/app.css';
	import { distractionStore } from '$lib/stores/distractions';
	import Distractions from '$lib/components/Distractions.svelte';

	let { children } = $props();

	let distraction: any = $state(null);

	distractionStore.subscribe((state: any) => {
		distraction = state.current;
	});

	function dismissDistraction() {
		distractionStore.dismiss();
	}
</script>

<svelte:head>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="mobile-web-app-capable" content="yes" />
</svelte:head>

{@render children?.()}

{#if distraction}
	<Distractions distraction={distraction} onDismiss={dismissDistraction} />
{/if}
