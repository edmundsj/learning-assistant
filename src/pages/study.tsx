import {Button, Dropdown, Form, Input, MenuProps, Modal} from "antd";
import {useEffect, useState} from "react";
import {useNote, useNoteDelete, useNoteInsert, useNotes, useNoteUpdate} from "@/models/notes/hooks";
import {Note, NoteInsert} from "@/hooks";
import {ContainerOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined} from "@ant-design/icons";
import {createEmptyNote, getNoteType, NoteType} from "@/models/notes/utils";


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

export const TopMenu = ({note}:{note: Note}) => {
  const [newOpen, setNewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editNoteId, setEditNoteId] = useState(0)
  const {mutate: update} = useNoteUpdate()
  const {mutate: del} = useNoteDelete()

  const items: MenuProps['items'] = [
    {label: 'Edit', icon: <EditOutlined/>, key: 'edit'},
    {label: 'Archive', icon: <ContainerOutlined/>, key: 'archive'},
    {label: 'Delete', icon: <DeleteOutlined/>, key: 'delete'},
  ]
  const onClick: MenuProps['onClick'] = ({key}) => {
    console.log(`clicked on item ${key} `)
    if(key === 'edit') {
      setEditNoteId(note.id)
      setEditOpen(true)
    } else if(key === 'delete') {
      del({id: note.id})
    } else if (key === 'archive') {
      update({id: note.id, archived: true})
    }
  }
  const onFinish = () => {
    setEditNoteId(0)
  }
  return (
    <>
      <div className={'flex justify-between pt-4 px-4 items-center h-[70px]'}>
        <NoteForm noteId={0} open={newOpen} setOpen={setNewOpen} onFinish={onFinish}/>
        <NoteForm noteId={editNoteId} open={editOpen} setOpen={setEditOpen} onFinish={onFinish}/>
        <AddButton onClick={() => {setNewOpen(true)}}/>
        <Dropdown menu={{items, onClick}}>
          <EllipsisOutlined className={'text-4xl text-black cursor-pointer'}/>
        </Dropdown>
      </div>
    </>
  )
}

export const BottomMenu = ({note, showAnswer, setShowAnswer}:{note?: Note, showAnswer: boolean, setShowAnswer: (show: boolean) => void}) => {
  const noteType:NoteType = getNoteType(note)
  let bottomMenu = <div></div>
  if(noteType === 'answered') {
    bottomMenu = <FlashcardMenu onFail={() => {}} onHard={() => {}} onMedium={() => {}} onEasy={() => {}}/>
  } else if (noteType === 'open') {
    bottomMenu = <OpenQuestionMenu onFail={() => {}} onKnow={() => {}}/>
  } else if (noteType === 'unprocessed') {
    bottomMenu = <UnprocessedMenu onFail={() => {}} onKnow={() => {}} />
  }
  return (
    showAnswer ? (
        bottomMenu
      ): (
        <div></div>
    )
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

export const UnprocessedMenu = ({onFail, onKnow}:OpenQuestionMenuProps) => {
  return (
    <div className={'flex'}>
      <div className={'bg-red-400 p-4 w-1/2 flex justify-center cursor-pointer hover:bg-red-500'}>
        Not Sure
      </div>
      <div className={'bg-green-400 p-4 w-1/2 flex justify-center cursor-pointer hover:bg-green-500'}>
        Got it!
      </div>
    </div>
  )
}

interface OpenQuestionMenuProps {

  onFail: () => void,
  onKnow: () => void,
}
export const OpenQuestionMenu = ({onFail, onKnow}:OpenQuestionMenuProps) => {
  return (
    <div className={'flex'}>
      <div className={'bg-red-400 p-4 w-1/2 flex justify-center cursor-pointer hover:bg-red-500'}>
        Not Sure
      </div>
      <div className={'bg-green-400 p-4 w-1/2 flex justify-center cursor-pointer hover:bg-green-500'}>
        Got it!
      </div>
    </div>
  )
}


interface FlashcardMenuProps {
  onFail: () => void,
  onHard: () => void,
  onMedium: () => void,
  onEasy: () => void,
}
export const FlashcardMenu = ({onFail, onMedium, onHard, onEasy}:FlashcardMenuProps) => {
  return (
    <div className={'flex'}>
      <div className={'p-4 flex justify-center cursor-pointer bg-red-400 hover:bg-red-500 w-1/4'}>
        Not Sure
      </div>
      <div className={'p-4 flex justify-center cursor-pointer bg-orange-400 hover:bg-orange-500 w-1/4'}>
        Hard
      </div>
      <div className={'p-4 flex justify-center cursor-pointer bg-green-400 hover:bg-green-500 w-1/4'}>
        Good
      </div>
      <div className={'p-4 flex justify-center cursor-pointer bg-blue-400 hover:bg-blue-500 w-1/4'}>
        Easy
      </div>
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