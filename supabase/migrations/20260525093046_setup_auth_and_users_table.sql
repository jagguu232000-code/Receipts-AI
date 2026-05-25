/*
  # Setup Users Table for Receipts AI

  1. New Tables
    - `users` table to store user profile data synchronized with Supabase Auth
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `mobile_number` (text)
      - `city` (text)
      - `country` (text)
      - `bio` (text)
      - `avatar_url` (text)
      - `signup_method` (text: 'email', 'google')
      - `has_used_trial` (boolean)
      - `is_purchased` (boolean)
      - `license_key` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `users` table
    - Users can only read/update their own profile
    - Service role can manage all records

  3. Indexes
    - Index on email for quick lookups
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  mobile_number text,
  city text DEFAULT 'San Francisco',
  country text DEFAULT 'United States',
  bio text,
  avatar_url text,
  signup_method text DEFAULT 'email',
  has_used_trial boolean DEFAULT false,
  is_purchased boolean DEFAULT false,
  license_key text DEFAULT '',
  free_trials_used integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can manage all users"
  ON public.users
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at DESC);
