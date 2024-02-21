import { writable } from "svelte/store";

// Using a Svelte store to manage the navigation state globally
export const isNavigationEnabled = writable(false);
// using user to be displayd if session is loged in to supabase
export const user = writable<string | null | undefined>(null);
// using notification position so it can move down

// Define an interface for the toast structure
interface iToast {
  id?: number; // id will be assigned when adding a toast, so it's optional here
  message?: string;
  type?: "info" | "error" | "success"; // You can adjust the type values based on your needs
  dismissible?: boolean;
  timeout?: number;
}

// Use the Svelte writable store with the correct typing for an array of Toasts
export const toasts = writable<iToast[]>([]);

export const addToast = (toast: iToast) => {
  const id = Math.floor(Math.random() * 10000);

  const defaults: iToast = {
    id,
    message: "", // Corrected typo here
    type: "info",
    dismissible: true,
    timeout: 3000,
  };

  toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

  // If toast is dismissible, dismiss it after "timeout" amount of time.
  if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export function dismissToast(id: number) {
  toasts.update((all) => all.filter((t) => t.id !== id));
}
