<script>
	import Calendar from './cal/calendar.svelte';
	import { createForm } from 'felte';

	import { Button } from 'spaper';

	export let onSubmit;
	// Give a type to onback function
	export let onBack;

	// export let page;

	const { form, data } = createForm({ onSubmit });
</script>

<form use:form class="w-full my-5">
	<div class="flex w-full justify-around">
		<Button type="warning" nativeType="button" on:click={() => onBack($data)}>Back</Button>
		<Button type="success" nativeType="submit">Submit</Button>
	</div>
	<div class=" items-center px-6 pt-4">
		<p class="border-t py-3">Drag to mark your availability on the calendar below!</p>
	</div>
	<Calendar />
</form>
