import Image from 'next/image'
import { UseAuth } from '../../contexts/authContext'
import { Button } from '../button'
import style from './style.module.scss'

export function Login() {
  const { userAuth, SignInWithGoogle, SignOutGeneral } = UseAuth()

  return (
    <div className={`${style.login} ${userAuth ? 'hasUserAuth' : ''}`}>
      {userAuth ? (
        <>
          <div className={style.information}>
            <Image
              width={50}
              height={50}
              src={userAuth?.avatar}
              objectFit='cover'
              className={style.avatar}
            />

            <span className={style.text}>
              <p>{userAuth?.name}</p>
              <p>{userAuth?.email}</p>
            </span>
          </div>

          <Button type='button' text='sair' color='var(--red)' onClick={() => SignOutGeneral()} />
        </>
      ) : (
        <Button type='button' text='entrar' color='var(--green)' onClick={() => SignInWithGoogle()} />
      )}
    </div>
  )
}
