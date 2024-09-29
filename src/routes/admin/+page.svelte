<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { formartNumber } from '$lib/utils';

	type DashboardCardProps = {
		title: string;
		subtitle: string;
		body: string;
	};
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	<div>
		{@render dashboard({
			title: 'Sales',
			subtitle: `${formartNumber(2000)} Orders`,
			body: '$1,000.00'
		})}
	</div>
	<div>
		{@render dashboard({
			title: 'Total Sales',
			subtitle: 'This Month',
			body: '$1,000.00'
		})}
	</div>
	<div>
		{@render dashboard({
			title: 'Total Sales',
			subtitle: 'This Month',
			body: '$1,000.00'
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
