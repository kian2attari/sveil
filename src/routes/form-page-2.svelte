<script>
	import { createForm } from 'felte';

	import { Button } from 'spaper';

	export let onSubmit;
	// Give a type to onback function
	export let onBack;

	const { form, data } = createForm({ onSubmit });
</script>

<form class="w-full">
	<div class="flex w-full justify-around">
		<Button type="warning" nativeType="button" on:click={() => onBack($data)}>Back</Button>
		<Button type="success" nativeType="submit">Submit</Button>
	</div>
	<div class="flex items-center px-6 py-4">
		<p class="border-b ">
			Mark your availability on the calendar below. Single click to edit the location/time zone.
			Double click on a block to delete it.
		</p>
	</div>
</form>
