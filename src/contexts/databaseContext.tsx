import { createContext, ReactNode, useContext } from 'react'
import { getDatabase, ref, update } from 'firebase/database'

type TUpsert = {
  table: string
  id: string
  data: object
}

type TDatabaseContext = {
  Upsert({ table, id, data }:TUpsert): Promise<void>
}

type TDatabaseContextProvider = {
  children: ReactNode;
}

const DatabaseContext = createContext({} as TDatabaseContext)

export function DatabaseContextProvider({ children }: TDatabaseContextProvider) {
  async function Upsert({ table, id, data }:TUpsert): Promise<void> {
    await update(ref(getDatabase(), `${table}/${id}`), data)
      .catch((error) => { console.error('error Upsert =>', error) })
  }

  return (
    <DatabaseContext.Provider value={{ Upsert }}>
      {children}
    </DatabaseContext.Provider>
  )
}

export const UseDatabase = () => useContext(DatabaseContext)
