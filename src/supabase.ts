import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 
  process.env.VITE_SUPABASE_URL;

const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Supabase credentials missing:', { 
    URL_EXISTS: !!SUPABASE_URL, 
    KEY_EXISTS: !!SUPABASE_ANON_KEY 
  });
  throw new Error('Supabase URL or Anon Key is missing');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);