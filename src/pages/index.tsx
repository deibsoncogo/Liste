import { Header } from '../components/header/header'
import style from './index.module.scss'

export default function Home() {
  return (
    <div className={style.container}>
      <Header />
    </div>
  )
}
