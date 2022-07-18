import { UseAuth } from '../../contexts/authContext'
import style from './login.module.scss'

export function Login() {
  const { user, SignInWithGoogle, SignOutGeneral } = UseAuth()

  return (
    <div className={style.container}>
      {user ? (
        <button
          type='button'
          name='sair'
          disabled={!user}
          onClick={SignOutGeneral}
          className={style.sair}
        >
          sair
        </button>
      ) : (
        <button
          type='button'
          name='entrar'
          disabled={!!user}
          onClick={SignInWithGoogle}
          className={style.entrar}
        >
          entrar
        </button>
      )}
    </div>
  )
}
