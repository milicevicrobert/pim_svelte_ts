<script lang="ts">
    import { onMount } from "svelte";
    import { supabase } from "../lib/supabaseClient";
    import Login from "../lib/Login.svelte";
    import { push } from "svelte-spa-router";
    import { isNavigationEnabled, user } from "../store";
  
    let clogUser: any;
    let startLogin = false;
  
    onMount(async () => {
      const { data, error } = await supabase.auth.getSession();
      clogUser = data;
  
      if (data.session != null && error == null) {
        $user = data.session.user.email;
        $isNavigationEnabled = true;
      }
    });
  
    async function signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) console.log("Error signing out:", error.message);
      else {
        $isNavigationEnabled = false;
        push("/");
      }
    }
  </script>
  
  <div class="bg-gray-500 text-white">
    <nav class="flex items-center justify-between flex-wrap p-2">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <img src="/src/assets/tractologo.svg" class="h-8 mr-2" alt="Tracto Logo" />
        <span class="font-semibold text-md tracking-tight">... pim management</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        {#if $isNavigationEnabled}
          <div class="text-sm lg:flex-grow">
            <a href="#/AddProduct" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Add Product
            </a>
            <a href="#/table" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Table
            </a>
            <a href="#/artikli" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
              db_Artikli
            </a>
            <!-- More navigation items -->
          </div>
          <div>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" on:click|preventDefault={signOut}>
              Sign out
            </a>
          </div>
        {:else}
          <div class="text-sm lg:flex-grow">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" on:click|preventDefault={() => (startLogin = true)}>
              Log in
            </a>
          </div>
        {/if}
      </div>
    </nav>
  </div>
  
  {#if startLogin && !$isNavigationEnabled}
    <Login />
  {/if}
  