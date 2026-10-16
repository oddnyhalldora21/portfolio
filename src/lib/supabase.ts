import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

/** Returns a Supabase client, or null if the env vars are not configured. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  client ??= createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMessage(msg: ContactMessage): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error(
      "The contact form isn't configured yet (missing Supabase environment variables).",
    );
  }
  // No .select() after insert: anonymous users are not allowed to read rows.
  const { error } = await supabase.from("contact_messages").insert(msg);
  if (error) throw new Error(error.message);
}
