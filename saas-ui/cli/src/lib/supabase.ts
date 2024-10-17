import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://oofkqgpfzbtwrqbtfvnt.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZmtxZ3BmemJ0d3JxYnRmdm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NDE4NjUsImV4cCI6MjAxNDQxNzg2NX0.wo5H7NeQN3vLgXael7WLklTj8TArbnHTgzwVvuQdeXM'

export function createSupabaseClient(token: string) {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
}
