<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { EllipsisVertical } from 'lucide-svelte';
	import { formartNumber, formatCurrency } from '$lib/utils.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Check } from 'lucide-svelte';
	import { CircleX } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	let { data } = $props();
	let { products } = data;
</script>

<div class="flex items-center justify-between gap-4">
	<PageHeader>Prodcuts</PageHeader>
	<Button href="/admin/products/new">Add Products</Button>
</div>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-0">
				<span class="sr-only">Available for purchase</span>
			</Table.Head>
			<Table.Head>Product Name</Table.Head>
			<Table.Head>Product Price</Table.Head>
			<Table.Head>Order</Table.Head>
			<Table.Head class="w-0">
				<span class="sr-only">Actions</span>
			</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each products as product}
			<Table.Row>
				<Table.Cell>
					{#if product.isAvailableForPurchase}
						<span class="sr-only">Available</span>
						<Check />
					{:else}
						<span class="sr-only">Unavailable</span>
						<CircleX />
					{/if}
				</Table.Cell>
				<Table.Cell>{product.name}</Table.Cell>
				<Table.Cell>{formatCurrency(product.priceInCents / 100)}</Table.Cell>
				<Table.Cell>{formartNumber(product._count.order)}</Table.Cell>
				<Table.Cell class="text-right">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<EllipsisVertical />
							<span class="sr-only">Actions</span>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<!-- Download product image -->
							<DropdownMenu.Item href="/admin/products/{product.id}/download" download
								>Download</DropdownMenu.Item
							>
							<!-- edit product details -->
							<DropdownMenu.Item href="/admin/products/{product.id}/edit" download
								>Edit</DropdownMenu.Item
							>
							<!-- Toggle status Active/Inactive Status -->
							<form action="?/toggleAvailability" method="POST" use:enhance>
								<button type="submit" class="w-full text-destructive">
									<DropdownMenu.Item>
										{#if product.isAvailableForPurchase}
											Deactivate
										{:else}
											Activate
										{/if}
									</DropdownMenu.Item>
								</button>
								<input type="hidden" name="id" value={product.id} />
								<input
									type="checkbox"
									name="isAvailableForPurchase"
									class="hidden"
									checked={!product.isAvailableForPurchase}
								/>
							</form>
							<!-- Delete product -->
							<form action=""></form>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
