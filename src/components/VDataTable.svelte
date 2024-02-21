<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "../lib/supabaseClient";
  import { slide } from "svelte/transition";

  let items: any[] = [];
  let searchTerm: string = "";
  let openRow: number | null = null;
  let showForm = false; // Controls form visibility for both add and edit
  let formMode: "add" | "edit" = 'add'; // 'add' or 'edit'
  let editingItemId: string | null = null; // ID of the item being edited
  let newName:string = ""; // Used for both adding and editing item names


  // call new form for adding data to database
  function addNewItem() {
    showForm = true; // Show the form when "ADD" button is clicked
  }

  function editItem(id: string, name: string) {
    newName = name; // Set the name in the form to the item's current name
    editingItemId = id; // Store the id of the item being edited
    formMode = 'edit'; // Set form mode to edit
    showForm = true; // Show the form
}
  
  async function submitForm() {
    // Add new item to database
    if (formMode === 'add') {
    const { data, error } = await supabase
      .from("products")
      .insert([{ name: newName }]);
    if (error) {
      console.error("Error adding item:", error);
    } else {
      // Fetch updated data after successful insertion
      await fetchData();
      // Reset form and hide it
      newName = "";
      showForm = false;
    }
  } else if (formMode === 'edit' && editingItemId) {
    const { error } = await supabase
      .from("products")
      .update({ name: newName })
      .eq('id', editingItemId);
    if (error) {
      console.error("Error updating item:", error);
    } else {
      // Fetch updated data and reset/clear form
      await fetchData();
      newName = "";
      showForm = false;
      formMode = 'add'; // Reset form mode to 'add'
      editingItemId = null; // Clear the id of the item being edited
    }
  }
}


  function cancelForm() {
    // Reset form and hide it
    newName = "";
    showForm = false;
  }

  async function fetchData() {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");
    if (error) console.error("error", error);
    else items = products;
  }

  function edit(id: string) {
    alert("Edit action for:  " + id);
    // Implement edit functionality here
  }

  async function remove(id: string) {
    if (confirm("Are you sure you want to delete this item? ID= " + id)) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        alert("Error deleting product: " + error.message);
      } else {
        await fetchData(); // Fetch updated data after successful deletion
      }
    }
  }

  $: filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  onMount(fetchData);
</script>

<div class="flex flex-col h-screen">
  <div class="py-2 inline-block min-w-full sm:px-1 lg:px-2">
    <div class="shadow-md sm:rounded-lg">
      {#if showForm}
      <div class="p-6 border-2 border-gray-200 rounded-lg shadow-md">
        <input type="text" placeholder="New Item Name" bind:value={newName} class="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500" />
        <div class="flex justify-end space-x-2 mt-4">
          <button on:click={submitForm} class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Submit</button>
          <button on:click={cancelForm} class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">Cancel</button>
        </div>
      </div>
    {/if}
      <table class="min-w-full">
        <thead class="bg-green-100 border-b sticky top-0">
          <tr>
            <th scope="col" class="th"> # </th>
            <th scope="col" class="th"> ID </th>
            <th scope="col" class="th">
              Name :
              <input
                type="text"
                placeholder="Search..."
                class=" font-normal text-sm w-50% text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                bind:value={searchTerm}
              />
            </th>
            <th scope="col" class="th"> Created At </th>
            <th scope="col" class="th">
              Actions
              <button on:click={() => addNewItem()}>ADD</button>
            </th>
          </tr>
        </thead>
        <tbody class="overflow-y-auto bg-white divide-y divide-gray-200">
          {#each filteredItems as { id, name, created_at }, i}
            <tr
              class="hover:bg-green-50"
              tabindex="0"
              on:dblclick={() => (openRow = openRow === i ? null : i)}
            >
              <td class="td">{i + 1}</td>
              <td class="td">{id}</td>
              <td class="td">{name}</td>
              <td class="td">{created_at}</td>
              <td class="td">
                <button
                  class="text-blue-600 hover:text-blue-900 mr-2"
                  on:click={() => editItem(id, name)}>Edit</button>
                
                <button
                  class="text-red-600 hover:text-red-900"
                  on:click={() => remove(id)}>Remove</button
                >
              </td>
            </tr>
            {#if openRow === i}
              <tr>
                <td colspan="4" class="p-0">
                  <div
                    class="px-2 py-3"
                    transition:slide={{ duration: 300, axis: "y" }}
                  >
                    <p>Image placeholder</p>
                  </div>
                </td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
      <p>text poslije tablice</p>
    </div>
    <p>text predzadnji div</p>
  </div>
  <p>text na kraju</p>
</div>

<style lang="postcss">
  /* Define a custom class using Tailwind's @apply directive */
  .td {
    @apply px-4 py-1  whitespace-nowrap text-sm font-normal text-gray-900 border-r;
  }
  .th {
    @apply px-4 text-left text-xs font-medium text-green-700 uppercase tracking-wider;
  }
</style>
