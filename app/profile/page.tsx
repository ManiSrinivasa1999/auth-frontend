import axios from 'axios'
import { cookies } from 'next/headers'
import ProfileCard from './ProfileCard'

type Response = {
  message: string
  user: {
    id: string
    name: string
    email: string
    password: string
  }
}

const getUser = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value
  const res = await axios.get('/user/profile', {
    headers: {
      Authorization: `access_token=${accessToken},refresh_token=${refreshToken}`,
    },
    withCredentials: true,
  })
  const data = (await res.data) as Response
  return data
}

const ProfilePage = async () => {
  const data = await getUser()
  return <ProfileCard {...data.user} />
}

export default ProfilePage
