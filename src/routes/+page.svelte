<script>
    import { redirect } from '@sveltejs/kit';

    export async function load({ page }) {
        redirect(302, "/cal");
    }

</script>