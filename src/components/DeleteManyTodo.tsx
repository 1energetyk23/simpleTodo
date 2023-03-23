import React, { type FC } from 'react'

interface DeleteManyTodoProps {
  isCheckedForDelete?: boolean
  todoText: string
  toggleDeleteCheck: (id: string) => void
  id: string
}

const DeleteManyTodo: FC<DeleteManyTodoProps> = ({ isCheckedForDelete, todoText, toggleDeleteCheck, id }) => {
  return (
    <div className={'w-full flex justify-between rounded-2xl overflow-hidden shadow-xl text-lg p-1.5 pl-3 my-2 border-[1px] border-slate-400/20 cursor-pointer hover:bg-red-200 transition-all' + (isCheckedForDelete ? ' bg-red-600 hover:bg-red-500 text-white' : ' bg-white')} onClick={() => toggleDeleteCheck(id)}>
      {todoText}
    </div>
  )
}

export default DeleteManyTodo