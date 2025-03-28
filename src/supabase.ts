import { createClient } from "@supabase/supabase-js";

// Robust URL validation and sanitization
function validateAndSanitizeUrl(url: string | undefined): string {
  if (!url) {
    throw new Error('Supabase URL is undefined');
  }

  // Remove any whitespace, trailing/leading dots or semicolons
  const cleanUrl = url.trim().replace(/[;.]+$/, '');

  // Ensure it starts with https://
  const formattedUrl = cleanUrl.startsWith('https://') 
    ? cleanUrl 
    : `https://${cleanUrl}`;

  try {
    // Validate URL construction
    new URL(formattedUrl);
    return formattedUrl;
  } catch (error) {
    console.error('Invalid Supabase URL:', url);
    throw new Error(`Failed to construct valid URL: ${formattedUrl}`);
  }
}

const SUPABASE_URL = validateAndSanitizeUrl(import.meta.env.VITE_SUPABASE_URL);
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    storageKey: 'todoapp-auth',
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
});