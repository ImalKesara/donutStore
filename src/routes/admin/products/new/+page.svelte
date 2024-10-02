<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { addFormSchema } from '$lib/formSchema.js';
	const { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(addFormSchema)
	});

	let { form: formData, delayed, enhance } = form;
</script>

<PageHeader>Add Products</PageHeader>
<!-- The enctype attribute specifies how the form-data should be encoded when submitting it to the server. -->
<!-- multipart/form-data	 This value is necessary if the user will upload a file through the form -->
<form
	class="space-y-4"
	action="/admin/products/new"
	method="POST"
	use:enhance
	enctype="multipart/form-data"
>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Product name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</form>
