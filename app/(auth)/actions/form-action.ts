'use server'

import { LoginFormSchema } from '@/app/lib/definitions'

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
  console.log(email, password)
  return {
    success: true,
    message: 'Login successfully!',
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
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password || !name) {
    return {
      success: false,
      message: 'Name, Email and password are required.',
    }
  }

  return {
    success: true,
    message: 'Registered successfully!',
  }
}
