import React from 'react'
import type { FC } from 'react'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface TopBarProps {
  toggleModal: () => void;
}

const TopBar: FC<TopBarProps> = ({ toggleModal }) => {
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
        <div className='w-[30%] max-w-s left-0 right-0 absolute mx-auto h-20 rounded-b-full text-sm text-black flex justify-evenly items-center shadow-xl bg-white'>
          <span>Logged in as:</span>
          <Image loader={loader} src={session.user.image ?? ""} alt="profile image" width={48} height={48} className="rounded-full" />
          <span>{session.user.name}</span>
        </div>
        <nav className='w-screen h-12 p-0 flex border-gray-400 border-y-1 border-solid shadow-md justify-between'>
          <button onClick={() => toggleModal()} className='w-[40%] h-full text-sm text-green-600 hover:bg-green-600 hover:text-white hover:transition-all'>Add todo</button>
          <button onClick={() => void signOut()} className='w-[40%] h-full text-sm text-red-600 hover:bg-red-600 hover:text-white hover:transition-all'>Sign out</button>
        </nav>
      </>
    )
  }
  return <div></div>
}

export default TopBar