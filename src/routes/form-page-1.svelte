<script>
	import { createForm } from 'felte';
	import reporter from '@felte/reporter-tippy';
	import { Button } from 'spaper';
	import { onMount } from 'svelte';
	import { text } from 'svelte/internal';

	const emailDomains = ['@college.harvard.edu', '@harvard.edu'];
	let originalDomains = [];

	export let onSubmit;

	const { form, data } = createForm({
		onSubmit,
		validate: validateEmailForm,
		extend: reporter({ tippyProps: { placement: 'right' } })
	});

	let dropdownList = [];
	let highlightedIndex = 0;

	function validateEmailForm(emailFormEntry) {
		if (!emailFormEntry.email || !emailFormEntry.email.includes('@')) {
			return {
				email: 'Please enter a valid email address'
			};
		}
	}

	function suggestDomains(value) {
		if (value.includes('@')) {
			originalDomains = emailDomains.slice(); // make a copy of the original domains
			dropdownList = emailDomains.filter((domain) => domain.startsWith(value.split('@')[1]));
			highlightedIndex = 0;
			if (dropdownList.length === 0) {
				dropdownList = originalDomains; // if no matches, show all the original domains again
			}
		} else {
			dropdownList = [];
			highlightedIndex = 0;
		}
	}

	function addDomain(domain) {
		data.email = data.email.split('@')[0] + domain;
		dropdownList = [];
		highlightedIndex = 0;
	}

	const handleKeyDown = (event) => {
		if (event.key === 'ArrowUp' && highlightedIndex > 0) {
			highlightedIndex--;
			event.preventDefault();
		} else if (event.key === 'ArrowDown' && highlightedIndex < dropdownList.length - 1) {
			highlightedIndex++;
			event.preventDefault();
		} else if (event.key === 'Tab' || event.key === ' ') {
			event.preventDefault();
			addDomain(dropdownList[highlightedIndex]);
		} else if (event.key === 'Enter' && dropdownList.length > 0) {
			event.preventDefault();
			addDomain(dropdownList[highlightedIndex]);
		}
	};

	const handleOutsideClick = (event) => {
		if (!event.target.closest('.email-suggestions')) {
			dropdownList = [];
			highlightedIndex = 0;
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
			on:keydown={handleKeyDown}
			bind:value={data.email}
		/>
		{#if dropdownList.length > 0}
			<ul class="email-suggestions">
				{#each dropdownList as domain, index}
					<li
						class={index === highlightedIndex ? 'highlighted' : ''}
						on:click={() => addDomain(domain)}
					>
						{data.email.split('@')[0] + domain}
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<Button type="secondary" class="max-w-min" nativeType="submit">Next</Button>
</form>

<style>
	.email-suggestions {
		position: absolute;
		z-index: 50;
		width: 100%;
		max-height: 200px;
		overflow-y: scroll;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		padding: 0.5rem;
		margin-top: 0.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.email-suggestions li {
		padding: 0.25rem 0.5rem;
		cursor: pointer;
	}

	.email-suggestions li.highlighted {
		background-color: #f2f2f2;
	}

	.border-b {
		border-bottom: 1px solid #ccc;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
	}
</style>
