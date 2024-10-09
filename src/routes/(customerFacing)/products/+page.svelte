<script lang="ts">
	import ProductCards from '$lib/components/ProductCards.svelte';
	let { data } = $props();
</script>


<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#each data.products as product}
		<!-- productCards -->
		<ProductCards {...product} />
	{/each}
</div>