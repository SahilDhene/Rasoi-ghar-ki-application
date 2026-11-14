import { createClient } from '@supabase/supabase-js'

// Both keys are public by design: data access is enforced by Row Level Security in Supabase.
const SUPABASE_URL = 'https://dpuftvtcfznczisdynbb.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwdWZ0dnRjZnpuY3ppc2R5bmJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MjA2NTUsImV4cCI6MjA5MDA5NjY1NX0.hwXjbvztIgas-PYHtz3f4eWUsipa8nm4-32siCn1b-I'
export const VAPID_PUBLIC_KEY =
  'BF2QEWEii7vV5bZetqL5m7SimgEXT9pOY73_7KMkMR97jnUZnl4ozidc8MKI46_TXCoVj5aYe0l1fAdoLSJUqBI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
