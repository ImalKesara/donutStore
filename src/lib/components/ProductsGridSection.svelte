<script lang="ts">
	import ProductCards from './ProductCards.svelte';
	import type { Product } from '@prisma/client';
	import { ArrowRight } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	type ProductsGridSection = {
		title: string;
		products: Product[];
	};
	let { title, products }: ProductsGridSection = $props();
</script>

<div class="space-y-4">
	<div class="flex gap-3">
		<h2 class="text-3xl font-bold capitalize">{title}</h2>
		<Button variant="outline" class="space-x-2" href="/products">
			<span>View All</span>
			<ArrowRight class="size-4" />
		</Button>
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each products as product}
			<!-- productCards -->
			<ProductCards {...product} />
		{/each}
	</div>
</div>
