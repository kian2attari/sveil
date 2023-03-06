<script>
	import { createForm } from 'felte';
	import reporter from '@felte/reporter-tippy';
	import { Button } from 'spaper';

	export let onSubmit;

	function validateEmailForm(emailFormEntry) {
		if (!emailFormEntry.email || !emailFormEntry.email.includes('@')) {
			return {
				email: 'Please enter a valid email address'
			};
		}
	}

	const { form, data } = createForm({
		onSubmit,
		validate: validateEmailForm,
		extend: reporter({ tippyProps: { placement: 'right' } })
	});
</script>

<form use:form>
	<p class="border-b">What is your email?</p>
	<div class="flex items-center   px-8 py-4">
		<input
			id="email"
			type="text"
			name="email"
			placeholder="jdoe@college.harvard.edu"
			aria-label="Email"
		/>
	</div>

	<Button type="secondary" class="flex-shrink-0 margin-left-small" nativeType="submit">Next</Button>
</form>
