<script lang="ts">
	import type { Snippet } from 'svelte';

	type Children = {
		children: Snippet;
	};

	let { children }: Children = $props();
</script>

<nav class="bg-primary text-primary-foreground flex list-none items-center justify-center px-4">
	{@render children()}
</nav>
