<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
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
			<Table.Head class="w-0">
				<span class="sr-only">Actions</span>
			</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			<Table.Cell class="font-medium">INV001</Table.Cell>
			<Table.Cell>Paid</Table.Cell>
			<Table.Cell>Credit Card</Table.Cell>
			<Table.Cell class="text-right">.00</Table.Cell>
		</Table.Row>
	</Table.Body>
</Table.Root>
