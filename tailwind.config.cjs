/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	}
	// This breaks the email form, we can put it back if needed and I'll figure out how to fix it
	// plugins: [require('@tailwindcss/forms')]
};
