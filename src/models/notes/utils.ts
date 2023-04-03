import {Note} from "@/hooks";

export type NoteType = 'answered' | 'open' | 'unprocessed' | 'none';

export function getNoteType(note: {question: Note['question'], answer: Note['answer']} | undefined):NoteType {
  if(note) {
    if (!!note.question && !!note.answer) {
      return 'answered'
    } else if (!!note.question && !note.answer) {
      return 'open'
    } else if (!note.question && !!note.answer) {
      return 'unprocessed'
    } else {
      return 'none'
    }
  }
  return 'none'
}

export function createEmptyNote():Note {
  return {
    id: 0,
    author: '',
    question: '',
    answer: '',
    updated_at: '',
    inserted_at: '',
    due_at: '',
    archived: false,
  }
}