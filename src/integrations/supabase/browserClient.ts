import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Public (browser) backend client.
 *
 * In some static-hosting environments (e.g. GitHub Pages), build-time env vars may be missing.
 * We fall back to the project's public URL + publishable key to prevent runtime crashes.
 */
const FALLBACK_URL = "https://talbimswpnpejlbwhtmc.supabase.co";
const FALLBACK_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhbGJpbXN3cG5wZWpsYndodG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MDg3NjQsImV4cCI6MjA4Mzk4NDc2NH0.jGnXC3bNL39oWNSxId_Orby8XweWWBgNpUEkO1VUOw8";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? FALLBACK_URL;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? FALLBACK_PUBLISHABLE_KEY;

const storage = typeof window !== "undefined" ? window.localStorage : undefined;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: storage
    ? {
        storage,
        persistSession: true,
        autoRefreshToken: true,
      }
    : {
        persistSession: false,
        autoRefreshToken: false,
      },
});
