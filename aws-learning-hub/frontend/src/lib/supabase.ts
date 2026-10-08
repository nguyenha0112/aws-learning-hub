import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type AppRole = "admin" | "user";

export type Profile = {
  id: string;
  email: string | null;
  role: AppRole;
  created_at: string;
};

let browserClient: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (browserClient) return browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  browserClient = createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
  return browserClient;
}
