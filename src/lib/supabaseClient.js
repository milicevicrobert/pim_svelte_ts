import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://icfvgceofbecbfjqdpoy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZnZnY2VvZmJlY2JmanFkcG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxMzkzNjQsImV4cCI6MjAyMjcxNTM2NH0.E-dlmSx48ICiEproC7dtVxlXKwnHRTgPoe_VjgjvFZ0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
