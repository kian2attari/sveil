<script>
	import { createForm } from 'felte';

	import { Button } from 'spaper';

	export let initialValues;
	export let onSubmit;
	export let onBack;

	const { form, data } = createForm({ onSubmit });
</script>

<form use:form>
	<button type="button" on:click={() => onBack($data)}> Previous page </button>
</form>

<form class="w-full max-w-sm">
	<p>Can you meet in person?</p>
	<div class="flex items-center border-b border-teal-500 px-6 py-4">
		<input type="text" placeholder="Jane Doe" aria-label="Full name" />
		<Button type="secondary" class="flex-shrink-0 margin-left-small" nativeType="submit"
			>Next</Button
		>
		<!-- <Button class="flex-shrink-0 ">Cancel</Button> -->
	</div>
</form>
