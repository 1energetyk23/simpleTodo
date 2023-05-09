import React, { useState } from 'react'
import type { FC } from 'react'

interface CreateModalProps {
  toggleCreateModal: () => void
  create: ({ }: { todo: string }) => void
}

const CreateModal: FC<CreateModalProps> = ({ toggleCreateModal, create }) => {
  const [todo, setTodo] = useState("");
  return (
    <div className='absolute w-screen h-screen bg-gray-600/40 flex flex-col overflow-hidden justify-center items-center top-0'>
      <section className='bg-white flex-shrink-0 w-[600px] max-w-[96%] h-48 p-0 radius rounded-2xl overflow-hidden shadow-lg'>
        <p className='w-[600px] max-w-[100%] h-16 text-2xl flex justify-center items-center'>Add todo</p>
        <input className='w-[600px] max-w-[100%] h-16 text-2xl p-3 box-border bg-gray-200 focus:outline-0' placeholder='Type in your todo!' type="text" name="todo" id="todo" onChange={e => setTodo(e.target.value)} autoFocus={true}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              create({ todo: todo });
              toggleCreateModal();
            }
          }}
        />
        <div className='w-[600px] max-w-[100%] h-16 text-xl flex justify-center'>
          <button className='w-[50%] h-16 text-2xl text-red-600 hover:bg-red-600 hover:text-white hover:transition-all' onClick={() => toggleCreateModal()}>Close</button>
          <button className='w-[50%] h-16 text-2xl text-green-600 hover:bg-green-600 hover:text-white hover:transition-all'
            onClick={() => {
              create({ todo: todo });
              toggleCreateModal();
            }}
          >Add</button>
        </div>
      </section>
    </div>
  )
}

export default CreateModal