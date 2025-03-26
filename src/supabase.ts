// import { createClient } from "@supabase/supabase-js";

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
// const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// console.log("Supabase URL:", SUPABASE_URL);
// if (!SUPABASE_URL){
//     console.error("SUPABASE_URL is not defined!");
// }

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// Multiple fallback mechanisms for URL and key
const SUPABASE_URL = validateAndSanitizeUrl(
  import.meta.env.VITE_SUPABASE_URL || 
  process.env.VITE_SUPABASE_URL || 
  'hphqgbqtsslzkefdegmg.supabase.co'
);

const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  process.env.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwaHFnYnF0c3NsemtlZmRlZ21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzODU1MjgsImV4cCI6MjA1Nzk2MTUyOH0.OZqZyNOn8CZvx1R0pT_WCsVcWpGaBvVy-eGV9u4ayJQ';

// Debug logging
console.log('Parsed Supabase URL:', SUPABASE_URL);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
  },
});