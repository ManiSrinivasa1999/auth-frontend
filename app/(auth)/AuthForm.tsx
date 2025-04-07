'use client'
import React, { useActionState, useState } from 'react'

type AuthState = {
  success: boolean
  message?: string
}

type AuthAction = (prevState: AuthState | undefined, formData: FormData) => Promise<AuthState>

type Props = {
  action: AuthAction
  isSignup: boolean
}

const AuthForm = ({ action, isSignup }: Props) => {
  const [state, formAction] = useActionState<AuthState, FormData>(action, {
    success: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section className="w-full h-screen flex flex-col">
      <form
        action={formAction}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-xs self-center"
      >
        {isSignup && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              placeholder="Eg: Mani Badam"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>

          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 pr-16 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="***********"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-500 font-medium hover:underline focus:outline-none pb-[12px]"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isSignup ? 'Sign up' : 'Sign In'}
        </button>
      </form>
    </section>
  )
}

export default AuthForm
