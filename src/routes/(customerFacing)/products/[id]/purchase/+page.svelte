<script lang="ts">
	import { Loader } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { PUBLIC_STRIPE_PUBLIC_KEY } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import { formatCurrency } from '$lib/utils.js';
	import { loadStripe } from '@stripe/stripe-js';
	import { onMount } from 'svelte';
	import { Elements, PaymentElement, Address, LinkAuthenticationElement } from 'svelte-stripe';
	import * as Card from '$lib/components/ui/card';

	let stripe: any = $state();
	let elements: any = $state(undefined);
	let isLoading = $state(false);
	let errorMsg: string | undefined = $state(undefined);
	let error: string | null = $state(null);

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_PUBLIC_KEY);
	});

	let { data } = $props();
	let productId = $derived(data.product.id);
</script>

<div class="mx-auto grid h-[750px] w-full max-w-5xl items-center space-y-8">
	<div class="grid grid-cols-2 gap-4">
		<img
			src={data.product.imagePath}
			alt="Product"
			class="h-[450px] w-[600px] rounded-lg object-cover"
		/>
		<div class="grid grid-rows-8 p-5">
			<h1 class="row-span-1 text-3xl font-black">{data.product.name}</h1>
			<p class="row-span-1">{data.product.description}</p>
			<p class="text-sm text-muted-foreground">{formatCurrency(data.product.priceInCents / 100)}</p>
			
			<!-- <Button>Buy</Button> -->
		</div>
	</div>
	<!-- stripe payment form -->
	<Elements clientSecret={data.clientSecrete} {stripe} bind:elements>
		<form>
			<Card.Root>
				<Card.Header>
					<Card.Title>Checkout</Card.Title>
					<Card.Description>Card Description</Card.Description>
				</Card.Header>
				<Card.Content>
					<LinkAuthenticationElement />
					<PaymentElement />
					<Address mode="billing" />
				</Card.Content>
				<Card.Footer>
					<Button
						type="submit"
						color="primary"
						size="lg"
						disabled={stripe === null || elements === undefined}
					>
						{#if isLoading}
							<Loader class="size-4 animate-spin" />
						{:else}
							Purchase - {formatCurrency(data.product.priceInCents/100)}
						{/if}
					</Button>
				</Card.Footer>
			</Card.Root>
		</form>
	</Elements>
</div>
