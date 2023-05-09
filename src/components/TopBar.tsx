import React from 'react'
import type { FC } from 'react'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BiLogOut } from 'react-icons/bi'

interface TopBarProps {
  toggleCreateModal: () => void;
  toggleDeleteManyModal: () => void;
}

const TopBar: FC<TopBarProps> = ({ toggleCreateModal, toggleDeleteManyModal }) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      void router.push("/api/auth/signin");
      return;
    },
  })
  if (session) {
    const loader = () => {
      return (session.user.image ?? "")
    }
    return (
      <>
        <div className='w-[36%] max-w-s absolute mx-auto left-0 right-0 -top-10 hover:top-0 transition-all h-30 text-sm bg-transparent hidden lg:block'>
          <button onClick={() => void signOut()} className="h-10 w-full text-white bg-red-500 hover:bg-red-600 transition-colors">Sign out</button>
          <div className='h-20 w-full flex justify-evenly items-center text-black rounded-b-full shadow-xl bg-white'>
            <span>Logged in as:</span>
            <Image loader={loader} src={session.user.image ?? ""} alt="profile image" width={48} height={48} className="rounded-full" />
            <span>{session.user.name}</span>
          </div>
        </div>
        <nav className='w-screen h-32 sm:h-12 p-0 flex border-gray-400 border-y-1 border-solid shadow-md justify-between flex-wrap'>
          <div className='h-20 w-full flex justify-between items-center text-black bg-white sm:hidden'>
            <Image loader={loader} src={session.user.image ?? ""} alt="profile image" width={48} height={48} className="rounded-full ml-2" />
            <span>{session.user.name}</span>
            <button className='h-full w-[20%] flex justify-center items-center hover:bg-red-600 text-red-600 hover:text-white' onClick={() => void signOut()}><BiLogOut size={30} /></button>
          </div>
          <button onClick={() => toggleCreateModal()} className='w-[50%] sm:w-[30%] lg:w-[40%] h-12 text-sm text-green-600 hover:bg-green-600 hover:text-white hover:transition-all'>Add todo</button>
          <div className='h-12 w-[40%] justify-between items-center text-black bg-white hidden sm:flex lg:hidden'>
            <Image loader={loader} src={session.user.image ?? ""} alt="profile image" width={40} height={40} className="rounded-full" />
            <span>{session.user.name}</span>
            <button className='h-full w-[30%] flex justify-center items-center hover:bg-red-600 text-red-600 hover:text-white' onClick={() => void signOut()}><BiLogOut size={24} /></button>
          </div>
          <button onClick={() => toggleDeleteManyModal()} className='w-[50%] sm:w-[30%] lg:w-[40%] h-12 text-sm text-red-600 hover:bg-red-600 hover:text-white hover:transition-all'>Delete Many</button>
        </nav>
      </>
    )
  }
  return <div></div>
}

export default TopBar