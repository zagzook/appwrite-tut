'use client'

import { getLoggedInUser } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [userDetails, setUserDetails] = useState<userDetails | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getLoggedInUser()
      if (!user) {
        router.push('/sign-in')
      } else {
        setUserDetails(user)
      }
    }
    checkAuth()
  }, [])
  return (
    <main className="flex flex-col h-full items-center justify-center">
      <h1 className="text-3xl">Landing Page</h1>
      <p>{userDetails?.email}</p>
    </main>
  )
}
