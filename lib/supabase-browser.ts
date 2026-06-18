import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const fallbackSupabaseUrl = "https://prhppuuwcnmfdhwsagug.supabase.co";
const fallbackSupabasePublishableKey = "sb_publishable_kGj9PTt1biObaT6q1uOTHw_nEJI1Rov";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackSupabaseUrl;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  fallbackSupabasePublishableKey;

let browserClient: SupabaseClient | null = null;

export function hasSupabaseBrowserConfig() {
  return Boolean(supabaseUrl && supabasePublishableKey);
}

export function createBrowserSupabaseClient() {
  if (!hasSupabaseBrowserConfig()) {
    throw new Error("Supabase browser configuration is missing.");
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }

  return browserClient;
}
