import React, { type FC } from 'react'
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai"
import { BsFillPencilFill } from "react-icons/bs"

interface TodoProps {
  todo: string,
  checked: boolean,
  check: ({ }: { todoId: string }) => void,
  deleteTodo: ({ }: { todoId: string }) => void,
  id: string,
  setModify: (id: string) => void
  toggleRename: (id: string) => void
}

const Todo: FC<TodoProps> = ({ todo, checked, check, deleteTodo, id, setModify, toggleRename }) => {
  return (
    <div className='w-full flex justify-between rounded-2xl overflow-hidden shadow-xl'>
      <div onClick={() => setModify(id)} className={'border-[1px] border-slate-400/20 rounded-l-2xl border-r-0 w-[55%] box-border text-lg cursor-pointer hover:bg-slate-400/30 hover:transition-all flex items-center pl-4' + (checked ? ' line-through' : '')}>{todo}</div>
      <div onClick={() => check({ todoId: id })} className='p-2 px-4 w-[15%] box-border text-lg cursor-pointer bg-green-500 hover:bg-green-600 text-white hover:transition-all flex justify-between'>Check!<AiOutlineCheck className='mt-[5px]' /></div>
      <div onClick={() => toggleRename(id)} className='p-2 px-4 w-[15%] box-border text-lg cursor-pointer bg-blue-500 hover:bg-blue-600 text-white hover:transition-all flex justify-between'>Rename<BsFillPencilFill className='mt-[5px]' /></div>
      <div onClick={() => deleteTodo({ todoId: id })} className='p-2 px-4 w-[15%] box-border text-lg cursor-pointer bg-red-500 hover:bg-red-600 text-white hover:transition-all flex justify-between'>Delete<AiFillDelete className='mt-[5px]' /></div>
    </div>
  )
}

export default Todo;
