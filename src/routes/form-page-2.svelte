<script lang="ts">
	import { createForm } from 'felte';

	import { Button } from 'spaper';

	export let onSubmit;
	// Give a type to onback function
	export let onBack: (data: any) => void;

	const { form, data } = createForm({ onSubmit });
</script>

<form class="w-full max-w-sm">
	<p>
		Mark your availability on the calendar below. Single click to edit the location/time zone.
		Double click on a block to delete it.
	</p>

	<Button nativeType="button" on:click={() => onBack($data)}>Back</Button>
</form>
