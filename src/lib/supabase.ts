import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          username: string
          role: 'admin' | 'lecturer' | 'student'
          date_of_birth: string | null
          phone: string | null
          address: string | null
          faculty_id: string | null
          department_id: string | null
          matric_number: string | null
          staff_id: string | null
          bio: string | null
          avatar_url: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          username: string
          role?: 'admin' | 'lecturer' | 'student'
          date_of_birth?: string | null
          phone?: string | null
          address?: string | null
          faculty_id?: string | null
          department_id?: string | null
          matric_number?: string | null
          staff_id?: string | null
          bio?: string | null
          avatar_url?: string | null
          is_verified?: boolean
        }
        Update: {
          email?: string
          full_name?: string
          username?: string
          role?: 'admin' | 'lecturer' | 'student'
          date_of_birth?: string | null
          phone?: string | null
          address?: string | null
          faculty_id?: string | null
          department_id?: string | null
          matric_number?: string | null
          staff_id?: string | null
          bio?: string | null
          avatar_url?: string | null
          is_verified?: boolean
        }
      }
      faculties: {
        Row: {
          id: string
          name: string
          full_name: string
          description: string | null
          dean_name: string | null
          dean_email: string | null
          dean_phone: string | null
          created_at: string
        }
      }
      departments: {
        Row: {
          id: string
          name: string
          faculty_id: string
          head_of_department: string | null
          created_at: string
        }
      }
    }
  }
}