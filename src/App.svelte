<script lang="ts">
  import Router from "svelte-spa-router";
  import NotFound from "./routes/NotFound.svelte";
  import Home from "./routes/Home.svelte";
  import VNavBar from "./components/VNavBar.svelte";
  import { isNavigationEnabled } from "./store";
  import Toasts from "./lib/Toasts.svelte";
  import VDataTable from "./components/VDataTable.svelte";
  import Aboute from "./routes/Aboute.svelte";
  import NewTable from "./components/NewTable.svelte";
  
  
  

  let routes = {
    "/": Home,
    "/vtable": VDataTable,
    "/aboute": Aboute,
    "/newTable": NewTable,
    
    "*": NotFound,
  };
</script>

<menu>
  <VNavBar />
  <Toasts />
</menu>

<main>
  {#if $isNavigationEnabled}
    <!-- Content that should be visible only when navigation is enabled -->
    <Router {routes} />
  {/if}
  <slot />
</main>
