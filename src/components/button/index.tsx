import { MouseEventHandler } from 'react'
import style from './style.module.scss'

type TProps = {
  type: 'button' | 'submit'
  text: string
  color: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function Button({ type, text, color, onClick }: TProps) {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      style={{ color: `${color}` }}
      className={style.button}
    >
      {text}
    </button>
  )
}
