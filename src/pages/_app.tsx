import { AppProps } from 'next/app'
import '../service/index'
import './_app.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
