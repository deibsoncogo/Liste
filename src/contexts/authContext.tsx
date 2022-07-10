import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'

type TUser = {
  id: string
  name: string
  avatar: string
  email: string
}

type TAuthContext = {
  user: TUser | undefined;
  SignInWithGoogle: () => Promise<void>;
}

type TAuthContextProvider = {
  children: ReactNode;
}

const AuthContext = createContext({} as TAuthContext)

export function AuthContextProvider(props: TAuthContextProvider) {
  const [user, setUser] = useState<TUser>()
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (isUser) => {
      if (isUser) {
        const { uid, displayName, photoURL, email } = isUser

        if (!uid || !displayName || !photoURL || !email) {
          throw new Error('Existe informação importante da conta faltando')
        }

        setUser({ id: uid, name: displayName, avatar: photoURL, email })
      }
    })

    return () => { unsubscribe() }
  }, [auth])

  async function SignInWithGoogle() {
    const provider = new GoogleAuthProvider()

    const response = await signInWithPopup(auth, provider)

    console.log('response =>', typeof response, response)

    if (response.user) {
      const { uid, displayName, photoURL, email } = response.user

      if (!uid || !displayName || !photoURL || !email) {
        throw new Error('Existe informação importante da conta faltando')
      }

      setUser({ id: uid, name: displayName, avatar: photoURL, email })
    }
  }

  return (
    <AuthContext.Provider value={{ user, SignInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const UseAuth = () => useContext(AuthContext)