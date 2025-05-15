import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WaitlistEntry = {
  id?: string;
  email: string;
  name: string;
  zip_code: string;
  comments?: string;
  role: 'customer' | 'farmer';
  monthly_cattle_sold?: number;  // For farmers
  monthly_beef_pounds?: number;  // For consumers
  created_at?: string;
}; 