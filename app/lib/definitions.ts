import { z } from 'zod'

const SignupFormSchema = z.object({
  name: z.string().min(5, { message: 'Name must be atleast 5 characters long' }).trim(),
  email: z.string().email({ message: 'Please enter a vaild email' }).trim(),
  password: z.string().min(8, { message: 'Password should be minimum a 8 characters long' }).trim(),
})

const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a vaild email' }).trim(),
  password: z.string().min(8, { message: 'Password should be minimum a 8 characters long' }).trim(),
})



export { SignupFormSchema, LoginFormSchema }
