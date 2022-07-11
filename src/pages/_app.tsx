import { AppProps } from 'next/app'
import { AuthContextProvider } from '../contexts/authContext'
import '../service/index'
import './_app.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
