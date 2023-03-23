import React from 'react'
import type { FC } from 'react'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
        <div className='w-[32%] max-w-s absolute mx-auto left-0 right-0 -top-10 hover:top-0 transition-all h-30 text-sm bg-transparent'>
          <button onClick={() => void signOut()} className="h-10 w-full text-white bg-red-500 hover:bg-red-600 transition-colors">Sign out</button>
          <div className='h-20 w-full flex justify-evenly items-center text-black rounded-b-full shadow-xl bg-white'>
            <span>Logged in as:</span>
            <Image loader={loader} src={session.user.image ?? ""} alt="profile image" width={48} height={48} className="rounded-full" />
            <span>{session.user.name}</span>
          </div>
        </div>
        <nav className='w-screen h-12 p-0 flex border-gray-400 border-y-1 border-solid shadow-md justify-between'>
          <button onClick={() => toggleCreateModal()} className='w-[40%] h-full text-sm text-green-600 hover:bg-green-600 hover:text-white hover:transition-all'>Add todo</button>
          <button onClick={() => toggleDeleteManyModal()} className='w-[40%] h-full text-sm text-red-600 hover:bg-red-600 hover:text-white hover:transition-all'>Delete Many</button>
        </nav>
      </>
    )
  }
  return <div></div>
}

export default TopBar