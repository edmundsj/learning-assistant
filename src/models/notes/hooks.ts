import {useUser} from "@supabase/auth-helpers-react";
import {useState} from "react";
import {NoteInsert, Note, useSupabaseClientTyped} from "@/hooks";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const noteKey = (id: number) => ['note', id]
const notesKey = () => ['notes']

export function useNote({id}:{id: number}) {
  const supabase = useSupabaseClientTyped()
  async function queryFn() {
    const { data, error, status } = await supabase
      .from('notes')
      .select(`*`)
      .eq('id', id)
      .single()
    if (error && status !== 406) {
      throw error
    }
    return data
  }
  return useQuery(noteKey(id), queryFn, {enabled: !!id})
}

export function useNotes() {
  const user = useUser()
  const supabase = useSupabaseClientTyped()
  async function queryFn() {
    const { data, error, status } = await supabase
      .from('notes')
      .select(`*`)
      .eq('author', user?.id)
      .eq('archived', false)
    if (error && status !== 406) {
      throw error
    }
    return data
  }

  return useQuery(notesKey(), queryFn, {enabled: !!user?.id})
}

export function useNoteInsert() {
  const user = useUser()
  const supabase = useSupabaseClientTyped()
  const queryClient = useQueryClient()

  async function mutationFn(note:Omit<NoteInsert, 'author' | 'archived'>) {
    const noteWithAuthor:NoteInsert = {archived: false, author: user?.id ?? null, ...note}
    const {error, data} = await supabase
      .from('notes')
      .insert(noteWithAuthor)
    if(error) throw error
    await queryClient.invalidateQueries(notesKey())
    return data
  }
  function onSuccess() {
    console.log('Successfully inserted note')
  }
  function onError() {
    console.log('There was an error inserting note')
  }
  queryClient.invalidateQueries()

  return useMutation({mutationFn, onSuccess, onError})
}

export function useNoteUpdate() {
  const user = useUser()
  const supabase = useSupabaseClientTyped()
  const queryClient = useQueryClient()

  async function mutationFn(note:Partial<Note> & {id: number}) {
    const {error, data} = await supabase
      .from('notes')
      .update(note)
      .eq('id', note.id)
    if(error) throw error
    await queryClient.invalidateQueries(noteKey(note.id))
    await queryClient.invalidateQueries(notesKey())
    return data
  }
  function onSuccess() {
    console.log('Successfully updated note.')
  }
  function onError() {
    console.log('There was an error updating note.')
  }

  return useMutation({mutationFn, onSuccess, onError})
}


export function useNoteDelete() {
  const user = useUser()
  const supabase = useSupabaseClientTyped()
  const queryClient = useQueryClient()

  async function mutationFn(note:{id: number}) {
    const {error, data} = await supabase
      .from('notes')
      .delete()
      .eq('id', note.id)
    if(error) throw error
    await queryClient.invalidateQueries(noteKey(note.id))
    await queryClient.invalidateQueries(notesKey())
    return data
  }
  function onSuccess() {
    console.log('Successfully deleted note.')
  }
  function onError() {
    console.log('There was an error deleting note.')
  }

  return useMutation({mutationFn, onSuccess, onError})
}
