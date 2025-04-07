import { registerAction } from '../../actions/form-action'
import AuthForm from '../AuthForm'

const Signup = () => {
  return <AuthForm isSignup={true} action={registerAction} />
}

export default Signup
