import React, { useState, type FC } from 'react'

interface TodoNotesProps {
  defaultValue: string,
  id: string,
  modifyNote: (id: string, note: string) => void,
  deleteNote: (id: string) => void
}

const TodoNote: FC<TodoNotesProps> = ({ id, defaultValue, modifyNote, deleteNote }) => {
  const [value, setValue] = useState(defaultValue);
  const [height, setHeight] = useState(1);
  const [isEdited, setIsEdited] = useState(false);
  return (
    <div className={(isEdited ? 'my-8' : 'my-4') + ' transition-all'}>
      {
        isEdited ? <div className='w-full flex flex-wrap rounded-b-xl overflow-hidden shadow-2xl text-lg my-0 first:mt-1 shadow-blue-300 transition-all'>
          <textarea rows={height} defaultValue={defaultValue} className="w-full p-2 focus:outline-0 h-auto rounded-t-xl bg-gray-100 border-[1px]  border-blue-400/40 border-b-0 resize-none" autoFocus={true}
            onChange={e => {
              setValue(e.target.value);
              setHeight((e.target.scrollHeight - 2) / 28)
            }}
            onFocus={e => setHeight((e.target.scrollHeight - 2) / 28)}
          />
          <button className="w-[50%] p-1 transition-all text-yellow-500 hover:bg-yellow-600 hover:text-white" onClick={() => {
            setIsEdited(false)
          }}>Cancel</button>
          <button className="w-[50%] p-1 transition-all text-green-500 hover:bg-green-600 hover:text-white" onClick={() => {
            modifyNote(id, value)
            setIsEdited(false)
          }}>Save Changes</button>
        </div>
          : <div className='w-full flex flex-wrap rounded-b-xl overflow-hidden shadow-xl text-lg my-0 first:mt-1 transition-all'>
            <p style={{ wordBreak: "break-all" }} className="w-full max-w-full p-2 bg-gray-100 rounded-t-xl border-[1px] border-slate-400/20 border-b-0 whitespace-pre-wrap">{defaultValue}</p>
            <button className="w-[50%] p-1 transition-all text-blue-600 hover:bg-blue-600 hover:text-white" onClick={() => void setIsEdited(true)}>Edit Note</button>
            <button className="w-[50%] p-1 transition-all text-red-600 hover:bg-red-600 hover:text-white" onClick={() => void deleteNote(id)}>Delete Note</button>
          </div>
      }
    </div>
  )
}

export default TodoNote