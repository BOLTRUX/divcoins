import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  )
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Database types (will be expanded as we build the schema)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      relationships: {
        Row: {
          id: string
          name: string
          description: string | null
          type: 'couple' | 'roommates' | 'friends' | 'family' | 'group'
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type: 'couple' | 'roommates' | 'friends' | 'family' | 'group'
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          type?: 'couple' | 'roommates' | 'friends' | 'family' | 'group'
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          relationship_id: string
          title: string
          amount: number
          currency: string
          category: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          relationship_id: string
          title: string
          amount: number
          currency?: string
          category: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          relationship_id?: string
          title?: string
          amount?: number
          currency?: string
          category?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      relationship_type: 'couple' | 'roommates' | 'friends' | 'family' | 'group'
    }
  }
}

// Helper functions for common operations
export const auth = supabase.auth

// Authentication helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  })
  return { data, error }
}

// User profile helpers
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const updateUserProfile = async (updates: {
  display_name?: string
  avatar_url?: string
}) => {
  const { data, error } = await supabase.auth.updateUser({
    data: updates,
  })
  return { data, error }
}

// Database helpers
export const getRelationships = async () => {
  const { data, error } = await supabase
    .from('relationships')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const createRelationship = async (relationship: {
  name: string
  description?: string
  type: 'couple' | 'roommates' | 'friends' | 'family' | 'group'
}) => {
  const { data, error } = await supabase
    .from('relationships')
    .insert([relationship])
    .select()
    .single()
  
  return { data, error }
}

export const getExpenses = async (relationshipId: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('relationship_id', relationshipId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const createExpense = async (expense: {
  relationship_id: string
  title: string
  amount: number
  category: string
  currency?: string
}) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([expense])
    .select()
    .single()
  
  return { data, error }
}