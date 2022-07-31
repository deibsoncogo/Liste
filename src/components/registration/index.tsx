import { useState, FormEvent, useEffect } from 'react'
import { child, get, getDatabase, ref, update } from 'firebase/database'
import { UseAuth } from '../../contexts/authContext'
import { Button } from '../button'
import style from './style.module.scss'

export function Registration() {
  const { user } = UseAuth()
  const [organization, setOrganization] = useState('')
  const [occupation, setOccupation] = useState('')

  async function UpsertRegistration(event: FormEvent): Promise<void> {
    event.preventDefault()
    await update(ref(getDatabase(), `users/${user.id}`), { organization, occupation })
      .catch((error) => console.error('UpsertRegistration error =>', error))
  }

  useEffect(() => {
    get(child(ref(getDatabase()), `users/${user?.id}`))
      .then((response) => {
        if (response.exists()) {
          setOrganization(response.val().organization)
          setOccupation(response.val().occupation)
        }
      })
      .catch((error) => console.error('Registration useEffect =>', error))
  }, [user])

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
          onClick={(event: FormEvent) => UpsertRegistration(event)}
        />
      </form>
    </div>
  )
}
