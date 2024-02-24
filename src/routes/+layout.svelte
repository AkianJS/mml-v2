<script lang="ts">
	import Navbar from "$lib/components/layout/Navbar.svelte";
	import { populateNavbarItemI } from "$lib/components/layout/navbarItems";
    import "../app.css"

    const navbarItems = populateNavbarItemI();
</script>

<Navbar navbarItems={navbarItems} />
<slot/>
