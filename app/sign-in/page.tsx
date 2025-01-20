import { getLoggedInUser } from '@/actions/auth'
import LoginForm from '@/components/LoginForm'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const SignIn = async () => {
  const user: userDetails | null = await getLoggedInUser()
  if (user) redirect('/')
  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Sign In</h1>
        <LoginForm />
        <div className="mt-2 flex items-center">
          <h1>Don&apos;t have an accont?</h1>
          <Link className="font-bold ml-2" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </section>
    </div>
  )
}

export default SignIn
