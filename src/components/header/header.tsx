import Image from 'next/image'
import { UseAuth } from '../../contexts/authContext'
import { Login } from '../login/login'
import style from './header.module.scss'

export function Header() {
  const { user } = UseAuth()

  return (
    <div className={`${style.header} ${user ? style.spaceBetween : ''}`}>
      {user && (
        <div className={style.information}>
          <Image width={50} height={50} src={user?.avatar} objectFit='cover' className={style.avatar} />

          <span className={style.text}>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </span>
        </div>
      )}

      <Login />
    </div>
  )
}
