import {Note} from "@/hooks";
import {useState} from "react";
import {useNoteDelete, useNoteUpdate} from "@/models/notes/hooks";
import {Dropdown, MenuProps} from "antd";
import {ContainerOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined} from "@ant-design/icons";
import {AddButton, NoteForm} from "@/pages/study";

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
