import { type Todos } from '@prisma/client'
import React, { useState, type FC } from 'react'
import { api } from '~/utils/api'
import CreateNoteModal from './CreateNoteModal'
import TodoNote from './TodoNote'

interface ModifyModalProps {
  id: string
  toggleModifyModal: () => void
  todos: Todos[] | undefined
}

const ModifyModal: FC<ModifyModalProps> = ({ id, toggleModifyModal, todos }) => {
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const toggleCreateNoteModal = () => void setCreateNoteModal(!createNoteModal);
  if (!todos) {
    toggleModifyModal();
    return <></>;
  }
  const { data: todoNotes, refetch: refetchTodoNotes } = api.todoNotes.getNotes.useQuery({ todoId: id });
  const modifyNote = api.todoNotes.modifyNote.useMutation({ onSuccess: () => void refetchTodoNotes() });
  const createNote = api.todoNotes.createNote.useMutation({ onSuccess: () => void refetchTodoNotes() });
  const deleteNote = api.todoNotes.deleteNote.useMutation({ onSuccess: () => void refetchTodoNotes() });
  return (
    <div className='absolute w-screen h-screen bg-gray-600/40 flex justify-center items-center top-0'>
      <section className='bg-white w-[600px] max-w-full h-[36rem] max-h-full p-0 pr-2 rounded-2xl overflow-hidden shadow-lg'>
        <p className='w-[600px] px-4 max-w-[100%] h-16 text-2xl flex justify-center items-center'>{todos.find((value) => value.id == id)?.todo}</p>
        <div className='box-shadow w-[200%] relative right-[50%] flex justify-center'>
          <div className='px-2 py-4 w-[50%] scrollbar h-[28rem] scrollbar overflow-y-auto'>
            {todoNotes ? todoNotes.map((value, index) => {
              return (<TodoNote key={index} defaultValue={value.note} id={value.id} modifyNote={(id: string, note: string) => {
                modifyNote.mutate({ noteId: id, note: note });
              }} deleteNote={(id: string) => {
                deleteNote.mutate({ noteId: id })
              }} />)
            }) : <></>}
          </div>
        </div>
        <div className='h-16 w-full'>
          <button className='w-[50%] h-16 text-2xl text-yellow-600 hover:bg-yellow-600 hover:text-white hover:transition-all' onClick={() => toggleModifyModal()}>Close</button>
          <button className='w-[50%] h-16 text-2xl text-green-600 hover:bg-green-600 hover:text-white hover:transition-all' onClick={() => {
            toggleCreateNoteModal();
          }}
          >Add Note</button>
        </div>
      </section>
      {createNoteModal ? <CreateNoteModal toggleCreateNoteModal={() => void toggleCreateNoteModal()} createNote={(note: string) => void createNote.mutate({ note: note, todoId: id })} /> : <></>}
    </div>
  )
}

export default ModifyModal