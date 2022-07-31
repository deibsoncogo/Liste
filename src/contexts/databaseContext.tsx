import { createContext, ReactNode, useContext } from 'react'
import { child, get, getDatabase, ref, update } from 'firebase/database'

type TGet = {
  table: string
  id: string
}

type TUpsert = {
  table: string
  id: string
  data: object
}

type TDatabaseContext = {
  Upsert({ table, id, data }:TUpsert): Promise<void>
  Get({ table, id }:TGet): Promise<object>
}

type TDatabaseContextProvider = {
  children: ReactNode;
}

const DatabaseContext = createContext({} as TDatabaseContext)

export function DatabaseContextProvider({ children }: TDatabaseContextProvider) {
  async function Upsert({ table, id, data }:TUpsert): Promise<void> {
    await update(ref(getDatabase(), `${table}/${id}`), data)
      .catch((error) => console.error('error Upsert =>', error))
  }

  async function Get({ table, id }:TGet): Promise<object> {
    const data = await get(child(ref(getDatabase()), `${table}/${id}`))
      .then((response) => response.val())
      .catch((error) => console.error('error Get =>', error))

    return data
  }

  return (
    <DatabaseContext.Provider value={{
      Upsert,
      Get,
    }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export const UseDatabase = () => useContext(DatabaseContext)
