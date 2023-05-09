import type { Todos } from '@prisma/client';
import React, { useState, type FC } from 'react'
import DeleteManyTodo from './DeleteManyTodo';

interface DeleteManyModalProps {
  toggleDeleteManyModal: () => void
  todos: Todos[] | undefined
  deleteTodo: ({ }: { todoId: string }) => void
}

const DeleteManyModal: FC<DeleteManyModalProps> = ({ toggleDeleteManyModal, todos, deleteTodo }) => {
  const [todosToDelete, setTodosToDelete] = useState([""]);
  const toggleDeleteCheck = (id: string) => {
    if (!todosToDelete.includes(id)) {
      setTodosToDelete([...todosToDelete, id])
    }
    else {
      const table = [...todosToDelete];
      table.splice(table.findIndex((value => value === id)), 1)
      setTodosToDelete(table);
    }
  }
  return (<div className='absolute w-screen h-screen bg-gray-600/40 flex justify-center items-center top-0'>
    <section className='bg-white w-[600px] max-w-full h-[36rem] max-h-full p-0 rounded-2xl overflow-hidden shadow-lg'>
      <p className='w-[600px] max-w-[100%] h-16 text-2xl flex justify-center items-center'>Delete Many Todos</p>
      <div className='px-2 overflow-hidden'>
        <div className='box-shadow w-[200%] relative right-[50%] flex justify-center'>
          <div className='h-[28rem] w-[50%] py-4 px-2 box-border overflow-y-auto scrollbar'>
            {todos && (todos.map((value) => {
              return <DeleteManyTodo todoText={value.todo} isCheckedForDelete={todosToDelete.includes(value.id)} key={value.id} id={value.id} toggleDeleteCheck={(id: string) => toggleDeleteCheck(id)} />
            }))}
          </div>
        </div>
      </div>
      <div className='h-16 w-full'>
        <button className='w-[50%] h-16 text-2xl text-yellow-600 hover:bg-yellow-600 hover:text-white hover:transition-all' onClick={() => toggleDeleteManyModal()}>Close</button>
        <button className='w-[50%] h-16 text-2xl text-red-600 hover:bg-red-600 hover:text-white hover:transition-all'
          onClick={() => {
            todosToDelete.forEach((value) => {
              if (value && todos) {
                deleteTodo({ todoId: value });
              }
            })
            toggleDeleteManyModal();
          }}
        >Delete</button>
      </div>
    </section>
  </div>
  )
}

export default DeleteManyModal