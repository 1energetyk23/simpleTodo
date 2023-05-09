import React, { useState } from 'react'
import type { FC } from 'react'

interface SetNewTodoNameModalProps {
  toggleSetNewTodoNameModal: (id: string) => void
  setNewTodoName: (id: string, todo: string) => void
  id: string
  defaultValue: string
}

const SetNewTodoNameModal: FC<SetNewTodoNameModalProps> = ({ id, toggleSetNewTodoNameModal, setNewTodoName, defaultValue }) => {
  const [todo, setTodo] = useState("");
  return (
    <div className='absolute w-screen h-screen bg-gray-600/40 flex justify-center items-center top-0'>
      <section className='bg-white w-[600px] max-w-[90%] h-48 p-0 radius rounded-2xl overflow-hidden shadow-lg'>
        <p className='w-[600px] max-w-[100%] h-16 text-2xl flex justify-center items-center'>Rename todo</p>
        <input className='w-[600px] max-[100%]: h-16 text-2xl p-3 box-border bg-gray-200 focus:outline-0' defaultValue={defaultValue} placeholder='Type in new todo name!' type="text" name="todo" id="todo" onChange={e => setTodo(e.target.value)} autoFocus={true}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setNewTodoName(id, todo);
              toggleSetNewTodoNameModal("");
            }
          }}
        />
        <div className='w-[600px] max-w-[100%] h-16 text-xl flex justify-center'>
          <button className='w-[50%] h-16 text-2xl text-yellow-600 hover:bg-yellow-600 hover:text-white hover:transition-all' onClick={() => toggleSetNewTodoNameModal("")}>Close</button>
          <button className='w-[50%] h-16 text-2xl text-green-600 hover:bg-green-600 hover:text-white hover:transition-all'
            onClick={() => {
              setNewTodoName(id, todo);
              toggleSetNewTodoNameModal("");
            }}
          >Save</button>
        </div>
      </section>
    </div>
  )
}

export default SetNewTodoNameModal