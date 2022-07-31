import { AppProps } from 'next/app'
import { Login } from '../components/login'
import { AuthContextProvider } from '../contexts/authContext'
import { DatabaseContextProvider } from '../contexts/databaseContext'
import '../service/index'
import './_app.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DatabaseContextProvider>
      <AuthContextProvider>
        <title>Liste</title>

        <Login />

        <Component {...pageProps} />
      </AuthContextProvider>
    </DatabaseContextProvider>
  )
}
