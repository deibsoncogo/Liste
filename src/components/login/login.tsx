import { UseAuth } from '../../contexts/authContext'
import './login.scss'

export function Login() {
  const { user, SignInWithGoogle, SignOutGeneral } = UseAuth()

  return (
    <div className='container'>
      {user ? (
        <button type='button' name='logar' onClick={SignOutGeneral} className='sair'>
          sair
        </button>
      ) : (
        <button type='button' name='logar' onClick={SignInWithGoogle} className='logar'>
          logar
        </button>
      )}
    </div>
  )
}
