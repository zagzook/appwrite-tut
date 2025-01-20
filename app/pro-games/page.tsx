import { getLoggedInUser } from '@/actions/auth'
import React from 'react'

const ProGames = async () => {
  const user: userDetails | null = await getLoggedInUser()
  return (
    <main className="flex flex-col h-full items-center justify-center gap-2">
      <h1 className="text-3xl">Pro Games Page</h1>
      <p className="text-lg">{user?.email}</p>
    </main>
  )
}

export default ProGames
