<script lang="ts">
	import  Navbar  from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	let pathname = $derived($page.url.pathname);
	import { cn } from '$lib/utils';
	let { children } = $props();
</script>

<Navbar>
	{@render navLink({ href: '/', text: 'Home' })}
	{@render navLink({ href: '/products', text: 'Products' })}
	{@render navLink({ href: '/orders', text: 'Orders' })}
</Navbar>

<div class="container my-6">
	{@render children()}
</div>

{#snippet navLink({ href, text }: { href: string; text: string })}
	<a
		class={cn(
			'p-4 capitalize transition-all  ease-in hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground',
			pathname === href && 'bg-background text-foreground'
		)}
		{href}>{text}</a
	>
{/snippet}
