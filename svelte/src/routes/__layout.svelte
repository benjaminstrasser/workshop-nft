<script lang="ts">
	import "../app.css";
	import { onMount } from 'svelte';

	onMount(async () => {
		await (await import('$lib/metamask')).connectMetamask();
	});
</script>

<slot />
