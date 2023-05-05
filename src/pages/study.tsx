import {Button, Dropdown, Form, Input, MenuProps, Modal} from "antd";
import {useEffect, useState} from "react";
import {useNote, useNoteDelete, useNoteInsert, useNotes, useNoteUpdate} from "@/models/notes/hooks";
import {Note, NoteInsert} from "@/hooks";
import {ContainerOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined} from "@ant-design/icons";
import {createEmptyNote, getNoteType, NoteType} from "@/models/notes/utils";
import {BottomMenu} from "@/components/BottomMenu";
import {TopMenu} from "@/components/TopMenu";


const StudyPage = () => {
  const {data: notes} = useNotes()
  const sortedNotes = notes?.sort(note => new Date(note.due_at ?? '').getTime()) ?? []
  const [showAnswer, setShowAnswer] = useState(false)
  const {data: updatedNote} = useNote({id: sortedNotes[0]?.id ?? 0})
  const activeNote = updatedNote ? updatedNote : createEmptyNote()


  return (
    <div className={'w-[400px] h-[700px] mx-auto flex flex-col bg-white text-black justify-between mt-8'}>
      <div className={'flex flex-col justify-start grow'}>
        <TopMenu note={activeNote}/>
        <NoteContent note={activeNote} showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
      </div>
      <BottomMenu note={activeNote} showAnswer={showAnswer} setShowAnswer={setShowAnswer}/>
    </div>
  )
}

export const NoteContent = ({note, showAnswer, setShowAnswer}:{note?:Note, showAnswer: boolean, setShowAnswer: (ans: boolean) => void}) => {
  const answerContent = showAnswer ? (
    <>
      <hr/>
      <div className={'flex justify-center text-center'}>
        {note?.answer ?? 'No answer'}
      </div>
    </>
  ) : <></>
  return (
    <div className={'pt-4 px-3 grow cursor-pointer flex flex-col gap-y-3'} onClick={() => {setShowAnswer(!showAnswer)}}>
      <div className={'flex justify-center text-center'}>
        {note?.question ?? 'No question'}
      </div>
      {answerContent}
    </div>
  )
}



export const AddButton = ({onClick}:{onClick: () => void}) => {
  return (
    <div className={'text-5xl rounded-[50%] w-[50px] h-[50px] border border-black border-solid flex justify-center' +
      ' items-center cursor-pointer hover:bg-green-100 pb-1 shadow-lg hover:shadow-md'} onClick={() => onClick()}>
      +
    </div>
  )
}


export const NoteForm = ({noteId, onFinish, open, setOpen}:{noteId: number, onFinish?: () => void,open: boolean, setOpen: (open: boolean) => void}) => {
  const [form] = Form.useForm()
  const {mutate: insert} = useNoteInsert()
  const {mutate: update} = useNoteUpdate()
  const {data: note} = useNote({id: noteId})

  useEffect(() => {
    if(note) {
      form.setFieldValue('question', note.question)
      form.setFieldValue('answer', note.answer)
    }
  }, [note, form])

  function onFinishInternal(values:any) {
    if(noteId && note) {
      update({...note, question: values.question, answer: values.answer})
    } else {
      insert({question: values.question, answer: values.answer})
    }
    form.resetFields()
    if(onFinish) {
      onFinish()
    }
    setOpen(false)
  }

  return (
    <Modal onCancel={() => {setOpen(false)}} open={open} title={'New Learning'} onOk={form.submit}>
      <Form form={form} onFinish={onFinishInternal}>
        <Form.Item name={'question'}>
          <Input placeholder={"I don't understand why..."} />
        </Form.Item>
        <Form.Item name={'answer'}>
          <Input placeholder={"I just learned that..."}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}


export default StudyPage
