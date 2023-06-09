import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import TopBar from "../components/TopBar";
import { useState } from "react";
import CreateModal from "~/components/CreateModal";
import Todo from "~/components/Todo";
import DeleteManyModal from "~/components/DeleteManyModal";
import ModifyModal from "~/components/ModifyModal";
import SetNewTodoNameModal from "~/components/SetNewTodoNameModal";

const Home: NextPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [deleteManyModal, setDeleteManyModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentlyOpen, setCurrentlyOpen] = useState("");
  const [renameModal, setRenameModal] = useState(false);
  const [currentlyRenamed, setCurrentlyRenamed] = useState("")
  const { data: todos, refetch: refetchTodos } = api.todo.getAll.useQuery(undefined);
  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      void refetchTodos();
    }
  })
  const checkTodo = api.todo.toggleCheck.useMutation({
    onSuccess: () => {
      void refetchTodos();
    }
  })
  const deleteTodo = api.todo.delete.useMutation({
    onSuccess: () => {
      void refetchTodos();
    }
  })
  const modifyTodoName = api.todo.modifyName.useMutation({
    onSuccess: () => {
      void refetchTodos();
    }
  })
  const toggleCreateModal = () => {
    setCreateModal(!createModal);
  }
  const toggleDeleteManyModal = () => {
    setDeleteManyModal(!deleteManyModal);
  }
  const toggleRenameModal = (id: string) => {
    setCurrentlyRenamed(id);
    setRenameModal(!renameModal);
  }
  const setModify = (id: string) => {
    setCurrentlyOpen(id);
    setOpenModal(!openModal);
  }
  return (
    <div className={"w-screen h-screen overflow-x-hidden overflow-y-auto"}>
      <Head>
        <title>SimpleTodo</title>
        <meta name="description" content="Simple todo app created with t3stack." />
        <meta name="keywords" content="todo, todoapp, app, t3stack" />
        <meta name="author" content="1energetyk23" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar toggleCreateModal={toggleCreateModal} toggleDeleteManyModal={toggleDeleteManyModal} />
      {createModal && <CreateModal toggleCreateModal={toggleCreateModal} create={({ todo }) => {
        void createTodo.mutate({ todo: todo })
      }} />}
      {deleteManyModal && <DeleteManyModal toggleDeleteManyModal={toggleDeleteManyModal} todos={todos} deleteTodo={({ todoId }) => {
        void deleteTodo.mutate({ id: todoId })
      }} />}
      {openModal && <ModifyModal todos={todos} toggleModifyModal={() => void setOpenModal(!openModal)} id={currentlyOpen} />}
      {renameModal && <SetNewTodoNameModal id={currentlyRenamed} toggleSetNewTodoNameModal={toggleRenameModal} defaultValue={todos ? (todos.find((value) => value.id === currentlyRenamed)?.todo || "") : ""} setNewTodoName={(id, todo) => {
        modifyTodoName.mutate({ id, todo });
      }} />}
      <main className="w-screen max-w-5xl bg-rgb mx-auto flex gap-3 flex-col pb-2 lg:pb-2 pt-6 lg:pt-12 p-1 lg:p-0">
        {todos?.map((value, index) => {
          return <Todo todo={value.todo} checked={value.isChecked} key={index} id={value.id} setModify={setModify} check={({ todoId }) => {
            void checkTodo.mutate({ id: todoId });
          }} deleteTodo={({ todoId }) => {
            void deleteTodo.mutate({ id: todoId });
          }} toggleRename={toggleRenameModal} />
        })}
      </main>
    </div>
  );
};

export default Home;

