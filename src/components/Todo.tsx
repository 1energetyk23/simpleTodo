import React, { type FC } from 'react'
import { AiFillDelete, AiOutlineCheck, AiFillEdit } from "react-icons/ai"

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
      <div onClick={() => check({ todoId: id })} className='p-2 px-4 w-[15%] box-border text-lg cursor-pointer bg-green-500 hover:bg-green-600 text-white hover:transition-all flex justify-center lg:justify-between items-center'><span className='hidden lg:inline'>Check!</span><AiOutlineCheck className='m-0.5 md:m-0 md:mt-[2px]' /></div>
      <div onClick={() => toggleRename(id)} className='p-2 px-4 w-[15%] box-border text-lg cursor-pointer bg-blue-500 hover:bg-blue-600 text-white hover:transition-all flex justify-center lg:justify-between items-center'><span className='hidden lg:inline'>Rename</span><AiFillEdit className='m-0.5 md:m-0 md:mt-[2px]' /></div>
      <div onClick={() => deleteTodo({ todoId: id })} className='p-2 px-4 w-[15%] box-border text-lg cursor-pointer bg-red-500 hover:bg-red-600 text-white hover:transition-all flex justify-center lg:justify-between items-center'><span className='hidden lg:inline'>Delete</span><AiFillDelete className='m-0.5 md:m-0 md:mt-[2px]' /></div>
    </div>
  )
}

export default Todo;
