<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { formatCurrency } from '$lib/utils.js';
	let { data } = $props();
</script>

<div class="mx-auto grid h-[750px] w-full max-w-5xl items-center space-y-8">
	<div class="grid grid-cols-2 gap-4">
		<img
			src={data.product.imagePath}
			alt="Product"
			class="h-[450px] w-[600px] rounded-lg object-cover"
		/>
		<div class="grid grid-rows-8 p-5">
			<h1 class="row-span-2 text-3xl font-black">{data.product.name}</h1>
			<p class="row-span-">{data.product.description}</p>
			<p class="text-sm text-muted-foreground">{formatCurrency(data.product.priceInCents / 100)}</p>
			<Button>Buy</Button>
		</div>
	</div>
</div>
