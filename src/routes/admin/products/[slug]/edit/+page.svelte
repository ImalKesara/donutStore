<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { superForm, fileProxy } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { addFormSchema } from '$lib/formSchema.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Loader } from 'lucide-svelte';

	import { formatCurrency } from '$lib/utils.js';
	import { page } from '$app/stores';
	const { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(addFormSchema.partial({file:true,image:true}))
	});

	let { form: formData, delayed, enhance } = form;
	// 								name = "file"
	const file = fileProxy(formData, 'file');
	// 								name = "image"
	const image = fileProxy(formData, 'image');
</script>

<PageHeader>Edit Product</PageHeader>
<!-- The enctype attribute specifies how the form-data should be encoded when submitting it to the server. -->
<!-- multipart/form-data	 This value is necessary if the user will upload a file through the form -->
<form
	class="space-y-4"
	action={`/admin/products/${$page.params.slug}/edit`}
	method="POST"
	use:enhance
	enctype="multipart/form-data"
>
	<!-- product name (name="name" means check out formSchema.ts file)-->
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Product name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- price in cents -->
	<Form.Field {form} name="priceInCents">
		<Form.Control let:attrs>
			<Form.Label>Price in Cents</Form.Label>
			<Input type="number" {...attrs} bind:value={$formData.priceInCents} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<div class="text-sm text-muted-foreground">
		{`Price in ${formatCurrency($formData.priceInCents / 100)}`}
	</div>

	<!-- Product Description -->
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Product Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- File -->
	<Form.Field {form} name="file">
		<Form.Control let:attrs>
			<Form.Label>Product File</Form.Label>
			<input
				{...attrs}
				type="file"
				bind:files={$file}
				class="block w-full text-sm text-slate-500
			file:mr-4 file:rounded-full file:border-0
			file:bg-violet-50 file:px-4
			file:py-2 file:text-sm
			file:font-semibold file:text-black
			hover:file:bg-violet-100"
			/>
			<div class="text-sm text-muted-foreground">{data.product.filePath}</div>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Image -->
	<Form.Field {form} name="image" >
		<Form.Control let:attrs >
			<Form.Label>Product Image</Form.Label>
			<!-- accept any image type -->
			<input
				{...attrs}
				accept="image/*"
				type="file"
				bind:files={$image}
				class="block w-full text-sm text-slate-500
			file:mr-4 file:rounded-full file:border-0
			file:bg-violet-50 file:px-4
			file:py-2 file:text-sm
			file:font-semibold file:text-black
			hover:file:bg-violet-100"
			/>
			<div class="text-sm text-muted-foreground">{data.product?.imagePath}</div>
			<img src={data.product.imagePath} alt="prodcut" class="h-[300px] w-[500px] object-cover" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Button type="submit" class="w-full">
		{#if $delayed}
			<Loader class="size-4 animate-spin" />
		{:else}
			Edit Product
		{/if}
	</Button>
</form>
