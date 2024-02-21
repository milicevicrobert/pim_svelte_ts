<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();

  export let type = "error";
  export let dismissible = true;
</script>

<div
  class={`p-3 text-white rounded flex items-center mx-auto my-2 w-80 ${
    type === "success"
      ? "bg-green-500/75"
      : type === "error"
        ? "bg-red-500/75"
        : "bg-blue-500/75"
  }`}
  role="alert"
  in:fade={{ duration: 300 }}
  out:fade={{ duration: 300 }}
>
  {#if type === "success"}
    <img src="/src/assets/successicon.svg" alt="OK!" />
  {:else if type === "error"}
    <img src="/src/assets/erroricon.svg" alt="ERR!" />
  {:else}
    <img src="/src/assets/infoicon.svg" alt="i" />
  {/if}

  <div class="text ml-4 flex-1">
    <slot />
  </div>

  {#if dismissible}
    <button
      class="close ml-auto text-white bg-transparent border-0 px-1 line-height[1] text-lg"
      on:click={() => dispatch("dismiss")}
    >
      <img src="/src/assets/closeicon.svg" alt="X" />
    </button>
  {/if}
</div>
