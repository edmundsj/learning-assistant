import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "@/models/supabase";


export type UserProfile = Database['public']['Tables']['profiles']['Row']
export type Note = Database['public']['Tables']['notes']['Row']
export type NoteInsert = Omit<Note, 'id' | 'inserted_at' | 'updated_at' | 'due_at'>
export type Response = Database['public']['Tables']['responses']['Row']
export function useSupabaseClientTyped () {
  return useSupabaseClient<Database>()
}