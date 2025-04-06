import { loginAction } from '../actions/form-action'
import AuthForm from '../AuthForm'

const Signin = () => {
  return <AuthForm isSignup={false} action={loginAction} />
}

export default Signin
