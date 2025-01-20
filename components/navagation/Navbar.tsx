import { getLoggedInUser } from '@/actions/auth'
import Link from 'next/link'
import React from 'react'
import Logout from '../Logout'
import Theme from '@/components/navagation/Theme'

const Navbar = async () => {
  const user: userDetails | null = await getLoggedInUser()
  return (
    <nav className="border-b bg-background w-full flex items-center">
      <div className="flex w-full items-center justify-between my-4">
        <Link href="/" className="font-bold">
          Home
        </Link>
        <div className="flex items-center gap-x-5">
          <Link href="/middleware">Middleware</Link>
          <Link href="/server">Server</Link>
          <Link href="/pro-games">Pro Games</Link>
        </div>
        <div className="flex items-center gap-x-5">
          {!user ? (
            <Link href="/sign-in">
              <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm">
                Login
              </div>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-x-2 text-sm">
                {user?.username}
              </div>
              <Logout />
            </>
          )}
          <Theme />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
