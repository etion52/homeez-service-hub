
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment."
  );
  
  // Provide a clear message about what's missing
  const missingVars = [];
  if (!supabaseUrl) missingVars.push("VITE_SUPABASE_URL");
  if (!supabaseAnonKey) missingVars.push("VITE_SUPABASE_ANON_KEY");
  
  throw new Error(
    `Supabase initialization failed. Missing environment variables: ${missingVars.join(", ")}. ` +
    "Please check your Supabase integration settings."
  );
}

// Create Supabase client with the available environment variables
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
