import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  email: string;
  full_name: string | null;
  mobile_number: string | null;
  city: string;
  country: string;
  bio: string | null;
  avatar_url: string | null;
  signup_method: string;
  has_used_trial: boolean;
  is_purchased: boolean;
  license_key: string;
  free_trials_used: number;
  created_at: string;
};
