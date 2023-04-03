export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          answer: string | null
          archived: boolean
          author: string | null
          due_at: string | null
          id: number
          inserted_at: string
          question: string | null
          updated_at: string
        }
        Insert: {
          answer?: string | null
          archived?: boolean
          author?: string | null
          due_at?: string | null
          id?: number
          inserted_at?: string
          question?: string | null
          updated_at?: string
        }
        Update: {
          answer?: string | null
          archived?: boolean
          author?: string | null
          due_at?: string | null
          id?: number
          inserted_at?: string
          question?: string | null
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      responses: {
        Row: {
          author: string | null
          created_at: string | null
          ease_level: number
          id: number
          next_interval_ms: number
          note: number | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          ease_level: number
          id?: number
          next_interval_ms?: number
          note?: number | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          ease_level?: number
          id?: number
          next_interval_ms?: number
          note?: number | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
