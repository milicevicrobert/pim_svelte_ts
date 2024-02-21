<script lang="ts" >
  
  import { supabase } from "./supabaseClient";
  import { isNavigationEnabled, user } from "../store";
  import { addToast} from "../store";
  import Toast from "./Toast.svelte";
  import Toasts from "./Toasts.svelte";
  let toast: {
      message: string,
      type:  "info" | "error" | "success",
      dismissable: boolean,
      timeout: number

  } = {
        message: "",
        type: "info",
        dismissable: true,
        timeout: 3000,
      };

  async function login() {
    try {
      loading = true;

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (loginError) {
        throw new Error(loginError.message);
      }
      // Perform successful login actions here
      const { data, error } = await supabase.auth.getSession();
      $user = data.session?.user?.email;
      console.log("login success to supabase user : ", $user);
      $isNavigationEnabled = true;
      toast.message = $user + " loged in to database";
      toast.type = "info";
      addToast(toast);
      // other success logic...
    } catch (e:any) {
      error = e.message;
      console.log("Login Error", error);
      // Handle login error
      toast.message = error;
      toast.type = "error";
      addToast(toast);
    } finally {
      loading = false;

      // Perform successful login actions here

      // other success logic...
    }
  }

  let email:string = "milicevicrobert@gmail.com";
  let password:string = "d0minat0r";
  let loading:boolean = false;
  let error:string = "";

  const handleSubmit = () => {
    // Here you would handle the form submission, e.g., validating input and logging the user in
    // After submission, you might want to redirect or enable the rest of the page
    login();
  };
</script>


<div class="flex items-center justify-center h-screen bg-gray-200">
  <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <!-- svelte-ignore a11y-autofocus -->
        <input
          type="email"
          id="email"
          bind:value={email}
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          autofocus
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Password</label
        >
        <input
          type="password"
          id="password"
          bind:value={password}
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          placeholder="Your Password"
        />
      </div>
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Log In
      </button>
    </form>
  </div>
</div>
