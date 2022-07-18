import { Header } from '../components/header'
import style from './index.module.scss'

export default function Home() {
  return (
    <div className={style.home}>
      <Header />
    </div>
  )
}
