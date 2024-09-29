<script lang="ts">
	import type { Snippet } from "svelte";

    type Children ={
        children :Snippet
    }

    let {children}: Children = $props()
</script>

<nav class="flex items-center justify-center bg-primary px-4 text-primary-foreground">
    {@render children()}
</nav>