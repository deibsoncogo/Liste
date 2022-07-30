import Image from 'next/image'
import { UseAuth } from '../../contexts/authContext'
import style from './style.module.scss'

export function Login() {
  const { user, SignInWithGoogle, SignOutGeneral } = UseAuth()

  return (
    <div className={`${style.login} ${user ? 'hasUser' : ''}`}>
      {user ? (
        <>
          <div className={style.information}>
            <Image width={50} height={50} src={user?.avatar} objectFit='cover' className={style.avatar} />

            <span className={style.text}>
              <p>{user?.name}</p>
              <p>{user?.email}</p>
            </span>
          </div>

          <button
            type='button'
            name='signOut'
            disabled={!user}
            onClick={SignOutGeneral}
            className={`${style.button} ${style.signOut}`}
          >
            sair
          </button>
        </>
      ) : (
        <button
          type='button'
          name='signIn'
          disabled={!!user}
          onClick={SignInWithGoogle}
          className={`${style.button} ${style.signIn}`}
        >
          entrar
        </button>
      )}
    </div>
  )
}
