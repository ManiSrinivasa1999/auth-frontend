'use server'

import { LoginFormSchema } from '@/app/lib/definitions'
import axios from 'axios'
import setCookieParser from 'set-cookie-parser'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type AuthState = {
  success: boolean
  message?: string
}

export async function loginAction(
  prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  const validateFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!validateFields.success) {
    return { success: false, message: JSON.stringify(validateFields.error.flatten().fieldErrors) }
  }

  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const res = await axios.post('/user/signin', {
      email,
      password,
    })
    const data = await res.data
    const cookieStore = await cookies();
    const cookieData = setCookieParser(res.headers['set-cookie']!)
    cookieData.forEach(cookie => {
      // @ts-ignore
      cookieStore.set(cookie.name, cookie.value, {...cookie})
    })
    redirect("/profile")
  } catch (error) {
    console.log("Error occured during login: ", error)
    throw error
  }
}

export async function registerAction(
  prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  const validateFields = LoginFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!validateFields.success) {
    return { success: false, message: JSON.stringify(validateFields.error.flatten().fieldErrors) }
  }
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password || !name) {
    return {
      success: false,
      message: 'Name, Email and password are required.',
    }
  }

  try {
    const res = await axios.post('/user/signup', {
      email,
      password,
      name
    })
    const data = await res.data
    const cookieStore = await cookies();
    const cookieData = setCookieParser(res.headers['set-cookie']!)
    cookieData.forEach(cookie => {
      // @ts-ignore
      cookieStore.set(cookie.name, cookie.value, {...cookie})
    })
    redirect("/profile")
  } catch (error) {
    console.log("Error occured during login: ", error)
    throw error
  }
}
