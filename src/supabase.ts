// import { createClient } from "@supabase/supabase-js";

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
// const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// console.log("Supabase URL:", SUPABASE_URL);
// if (!SUPABASE_URL){
//     console.error("SUPABASE_URL is not defined!");
// }

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { createClient } from "@supabase/supabase-js";

// Explicitly use process.env for deployment environments
const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 
  process.env.VITE_SUPABASE_URL || 
  'YOUR_SUPABASE_URL';

const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  process.env.VITE_SUPABASE_ANON_KEY || 
  'YOUR_SUPABASE_ANON_KEY';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Supabase URL or Anon Key is missing');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);