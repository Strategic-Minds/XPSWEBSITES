// app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

// Check if Supabase is actually configured (not just placeholders)
export const isSupabaseConfigured = (): boolean =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  );

// Browser client (anon)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server/API client (service role — bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Upload a file to Supabase Storage
export async function uploadLeadFile(
  leadId: string,
  file: File,
  index: number
): Promise<{ path: string; url: string } | null> {
  if (!isSupabaseConfigured()) return null;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'xps-jobsite-images';
  const ext = file.name.split('.').pop() || 'bin';
  const path = `leads/${leadId}/file_${index}_${Date.now()}.${ext}`;
  const { error } = await supabaseAdmin.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) return null;
  const { data: { publicUrl } } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  return { path, url: publicUrl };
}
