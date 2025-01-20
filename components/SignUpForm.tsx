'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import AuthButton from './AuthButton'
import { signUp } from '@/actions/auth'
// import AuthButton from './AuthButton'

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(event.currentTarget)
    const result = await signUp(formData)

    if (result?.error) {
      setError(result?.error)
    } else if (result?.success) {
      router.push('/')
    }

    setLoading(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-200">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            required
            className="text-gray-800 mt-1 w-full px-4 p-2 h-10 rounded-md border-gray-200"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            required
            className="text-gray-800 mt-1 w-full px-4 p-2 h-10 rounded-md border-gray-200"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            required
            className="text-gray-800 mt-1 w-full px-4 p-2 h-10 rounded-md border-gray-200"
          />
        </div>
        <AuthButton type="signup" loading={loading} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  )
}

export default SignUpForm
