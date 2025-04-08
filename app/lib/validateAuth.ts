import axios from 'axios'
import { cookies } from 'next/headers'

export const validateAuth = async () => {
  const cookieStore = await cookies()
  try {
    const URL = process.env.LOCAL_BACKEND_URL + '/validate/tokens'
    const accessToken = cookieStore.get('access_token')?.value
    const refreshToken = cookieStore.get('refresh_token')?.value
    const res = await axios.put(
      URL,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `access_token=${accessToken},refresh_token=${refreshToken}`,
        },
      }
    )
    const data = await res.data
    console.log('Response from validation', data)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
