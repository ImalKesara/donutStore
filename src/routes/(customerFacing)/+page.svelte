<script lang="ts">
	import ProductsGridSection from '$lib/components/ProductsGridSection.svelte';
	let { data } = $props();
</script>

<div class="space-y-12">
	<ProductsGridSection title="most popluar" products={data.mostPopularProduct} />
	<ProductsGridSection title="Newset" products={data.newsetProduct} />
</div>
