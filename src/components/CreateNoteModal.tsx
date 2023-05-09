import React, { useState, type FC } from 'react'

interface CreateNoteModalProps {
  toggleCreateNoteModal: () => void,
  createNote: (note: string) => void
}

const CreateNoteModal: FC<CreateNoteModalProps> = ({ createNote, toggleCreateNoteModal }) => {
  const [note, setNote] = useState("");
  return (
    <div className='absolute w-screen h-screen bg-gray-600/40 flex justify-center items-center top-0'>
      <section className='bg-white w-[600px] max-w-[90%] h-48 p-0 radius rounded-2xl overflow-hidden shadow-lg'>
        <p className='w-[600px] max-w-[100%] h-16 text-2xl flex justify-center items-center'>Add note</p>
        <input className='w-[600px] max-[100%]: h-16 text-2xl p-3 box-border bg-gray-200 focus:outline-0' placeholder='Type in your note!' type="text" name="todo" id="todo" autoFocus={true}
          onChange={e => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createNote(note);
              toggleCreateNoteModal();
            }
          }}
        />
        <div className='w-[600px] max-w-[100%] h-16 text-xl flex justify-center'>
          <button className='w-[50%] h-16 text-2xl text-red-600 hover:bg-red-600 hover:text-white hover:transition-all' onClick={() => toggleCreateNoteModal()}>Close</button>
          <button className='w-[50%] h-16 text-2xl text-green-600 hover:bg-green-600 hover:text-white hover:transition-all'
            onClick={() => {
              createNote(note);
              toggleCreateNoteModal();
            }}
          >Add</button>
        </div>
      </section>
    </div>
  )
}

export default CreateNoteModal