<script lang="ts">
  import Toast from "./Toast.svelte";
  import { dismissToast, toasts } from "../store";
</script>

{#if $toasts}
  <div class="fixed top-0 right-0 flex flex-col mt-4 z-50">
    {#each $toasts as toast (toast.id)}
      <Toast
        type={toast.type}
        dismissible={toast.dismissible}
        on:dismiss={() => dismissToast(toast.id)}
      >
        {toast.message}
      </Toast>
    {/each}
  </div>
{/if}
