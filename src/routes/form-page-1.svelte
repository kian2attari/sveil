<script>
	import { createForm } from 'felte';
	import reporter from '@felte/reporter-tippy';
	import { Button } from 'spaper';
	import { onMount } from 'svelte';
	import { text } from 'svelte/internal';

	const emailDomains = ['@college.harvard.edu', '@harvard.edu'];

	export let onSubmit;

	const { form, data } = createForm({
		onSubmit,
		validate: validateEmailForm,
		extend: reporter({ tippyProps: { placement: 'right' } })
	});

	let dropdownList = [];

	function validateEmailForm(emailFormEntry) {
		if (!emailFormEntry.email || !emailFormEntry.email.includes('@')) {
			return {
				email: 'Please enter a valid email address'
			};
		}
	}

	function suggestDomains(value) {
		if (value.includes('@')) {
			dropdownList = emailDomains.filter((domain) => domain.startsWith(value.split('@')[1]));
		} else {
			dropdownList = [];
		}
	}

	function addDomain(domain) {
		data.email = data.email.split('@')[0] + domain;
		dropdownList = [];
	}

	const handleOutsideClick = (event) => {
		if (!event.target.closest('.email-suggestions')) {
			dropdownList = [];
		}
	};

	onMount(() => {
		document.addEventListener('click', handleOutsideClick);
	});
</script>

<form use:form>
	<p class="border-b">What is your email?</p>
	<div class="relative py-4 ">
		<input
			id="email"
			type="text"
			name="email"
			class="w-full"
			placeholder="jdoe@college.harvard.edu"
			aria-label="Email"
			on:input={(event) => suggestDomains(event.target.value)}
			bind:value={data.email}
		/>
		{#if dropdownList.length > 0}
			<ul class="email-suggestions">
				{#each dropdownList as domain}
					<li on:click={() => addDomain(domain)}>{data.email.split('@')[0] + domain}</li>
				{/each}
			</ul>
		{/if}
	</div>

	<Button type="secondary" class="flex-shrink-0 margin-left-small" nativeType="submit">Next</Button>
</form>

<style>
	.email-suggestions {
		position: absolute;
		z-index: 50;
		width: 100%;
		max-height: 200px;
		overflow-y: scroll;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	}

	.email-suggestions li {
		padding: 8px;
		cursor: pointer;
	}

	.email-suggestions li:hover {
		background-color: #eee;
	}
</style>
