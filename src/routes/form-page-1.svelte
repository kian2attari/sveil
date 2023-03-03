<script>
	import { createForm } from 'felte';

	import { Button } from 'spaper';

	export let initialValues;
	export let onSubmit;

	const { form, data } = createForm({ onSubmit });
</script>

<form use:form>
	<p>What is your first and last name?</p>
	<div class="flex items-center border-b border-teal-500 px-6 py-4">
		<input type="text" placeholder="Jane Doe" aria-label="Full name" />
		<Button type="secondary" class="flex-shrink-0 margin-left-small" nativeType="submit"
			>Next</Button
		>
		<!-- <Button class="flex-shrink-0 ">Cancel</Button> -->
	</div>
</form>
