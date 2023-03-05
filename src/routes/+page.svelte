<script>
	import 'papercss/dist/paper.min.css';

	import FormPage1 from './form-page-1.svelte';
	import FormPage2 from './form-page-2.svelte';

	const pages = [FormPage1, FormPage2];

	let page = 0;

	let pagesState = [];

	// Our handlers
	function onSubmit(values) {
		if (page === pages.length - 1) {
			// On our final page we POST our data somewhere
			return fetch('https://example.com/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(pagesState)
			}).then((response) => {
				// We handle the response
			});
		} else {
			// If we're not on the last page, store our data and increase a step
			pagesState[page] = values;
			pagesState = pagesState; // Triggering update
			page += 1;
		}
	}

	function onBack(values) {
		if (page === 0) return;
		pagesState[page] = values;
		pagesState = pagesState; // Triggering update
		page -= 1;
	}
</script>

<main>
	<h1>sveil</h1>
	<svelte:component this={pages[page]} {onSubmit} {onBack} initialValues={pagesState[page]} />
</main>
