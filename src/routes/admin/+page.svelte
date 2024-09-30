<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { formartNumber, formatCurrency } from '$lib/utils';

	type DashboardCardProps = {
		title: string;
		subtitle: string;
		body: string;
	};
	let { data } = $props();
	let { salesData, productData, userData } = $derived(data);
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	<div>
		{@render dashboard({
			title: 'Sales',
			subtitle: `${formartNumber(salesData.numberOfSales)} Orders`,
			body: formatCurrency(salesData.amount)
		})}
	</div>
	<div>
		{@render dashboard({
			title: 'Customers',
			subtitle: `${formatCurrency(userData.averageValuePerUser)} Average Value`,
			body: formartNumber(userData.userCount)
		})}
	</div>
	<div>
		{@render dashboard({
			title: 'Active Products',
			subtitle: `${formartNumber(productData.inactiveCount)} orders`,
			body: formartNumber(productData.activeCount)
		})}
	</div>
</div>

{#snippet dashboard({ title, subtitle, body }: DashboardCardProps)}
	<Card.Root>
		<Card.Header>
			<Card.Title>{title}</Card.Title>
			<Card.Description>{subtitle}</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>{body}</p>
		</Card.Content>
	</Card.Root>
{/snippet}
