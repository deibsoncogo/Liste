import Image from 'next/image'
import { UseAuth } from '../../contexts/authContext'
import { Login } from '../login/login'
import style from './header.module.scss'

export function Header() {
  const { user } = UseAuth()

  return (
    <div id={!user && style.user} className={style.container}>
      {user && (
        <div className={style.information}>
          <Image width={50} height={50} src={user?.avatar} objectFit='cover' className={style.avatar} />

          <div className={style.text}>
            <strong>{user?.name}</strong>
            <p>{user?.email}</p>
          </div>
        </div>
      )}

      <Login />
    </div>
  )
}
