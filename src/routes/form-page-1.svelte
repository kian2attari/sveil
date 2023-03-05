<script>
	import { createForm } from 'felte';

	import { Button } from 'spaper';

	export let initialValues;
	export let onSubmit;

	const { form, data } = createForm({ onSubmit });
</script>

<form use:form>
	<p class="border-b">What is your first and last name?</p>
	<div class="flex items-center  px-6 py-4">
		<input type="text" placeholder="Jane Doe" aria-label="Full name" />
	</div>
	<Button type="secondary" class="flex-shrink-0 margin-left-small" nativeType="submit">Next</Button>
</form>
