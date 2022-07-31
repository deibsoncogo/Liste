import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { UseDatabase } from './databaseContext'

type TUserAuth = {
  id: string
  name: string
  avatar: string
  email: string
}

type TAuthContext = {
  userAuth: TUserAuth | undefined
  SignInWithGoogle: () => Promise<void>
  SignOutGeneral: () => Promise<void>
}

type TAuthContextProvider = {
  children: ReactNode
}

const AuthContext = createContext({} as TAuthContext)

export function AuthContextProvider({ children }: TAuthContextProvider) {
  const { Upsert } = UseDatabase()
  const [userAuth, setUserAuth] = useState<TUserAuth>()
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user

        setUserAuth({ id: uid, name: displayName, avatar: photoURL, email })
        Upsert({ table: 'users', id: uid, data: { name: displayName, avatar: photoURL, email } })
      }
    })
  }, [auth, Upsert])

  async function SignInWithGoogle(): Promise<void> {
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider())

      if (user) {
        const { uid, displayName, photoURL, email } = user

        setUserAuth({ id: uid, name: displayName, avatar: photoURL, email })
        Upsert({ table: 'users', id: uid, data: { name: displayName, avatar: photoURL, email } })
      }
    } catch (error) {
      console.log('error signInWithPopup =>', error)
    }
  }

  async function SignOutGeneral(): Promise<void> {
    await signOut(auth)
    setUserAuth(undefined)
  }

  return (
    <AuthContext.Provider value={{
      userAuth,
      SignInWithGoogle,
      SignOutGeneral,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const UseAuth = () => useContext(AuthContext)
