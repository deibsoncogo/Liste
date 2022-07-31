import { useEffect, useState } from 'react'
import { UseAuth } from '../../contexts/authContext'
import { UseDatabase } from '../../contexts/databaseContext'
import { Button } from '../button'
import style from './style.module.scss'

type TUserRegistration = {
  organization: string
  occupation: string
}

export function Registration() {
  const { Upsert, Get } = UseDatabase()
  const { userAuth } = UseAuth()

  const [organization, setOrganization] = useState('')
  const [occupation, setOccupation] = useState('')

  useEffect(() => {
    Get({ table: 'users', id: userAuth?.id })
      .then((response: TUserRegistration) => {
        if (response) {
          setOrganization(response.organization)
          setOccupation(response.occupation)
        }
      })
  }, [Get, userAuth])

  return (
    <div className={style.registration}>
      <h2 className={style.title}>Mantenha seu cadastro atualizado</h2>

      <form className={style.form}>
        <input
          type='text'
          name='organization'
          id='organization'
          placeholder='Organização'
          value={organization}
          onChange={(event) => setOrganization(event.target.value)}
          spellCheck='false'
          className={style.input}
        />

        <input
          type='text'
          name='occupation'
          id='occupation'
          placeholder='Ocupação'
          value={occupation}
          onChange={(event) => setOccupation(event.target.value)}
          className={style.input}
        />

        <Button
          type='submit'
          text='salvar'
          color='var(--pink1)'
          onClick={(event) => {
            event.preventDefault()
            Upsert({ table: 'users', id: userAuth.id, data: { organization, occupation } })
          }}
        />
      </form>
    </div>
  )
}
