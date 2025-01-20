import { getLoggedInUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Middleware = async () => {
  const user: userDetails | null = await getLoggedInUser()
  if (!user) redirect('/')
  console.log('user', user)
  return (
    <main className="flex flex-col h-full items-center justify-center gap-2">
      <h1 className="text-3xl">Middleware Page</h1>
      <p className="text-lg">User email: {user?.email}</p>
      <p className="text-lg">User ID: {user?.$id}</p>
      <p className="text-lg">User username: {user?.username}</p>
      <p className="text-lg">Total Score: {user?.totalScore}</p>
      <p className="text-lg">
        Is ProMember: {user?.proMember ? 'true' : 'false'}
      </p>
    </main>
  )
}

export default Middleware
