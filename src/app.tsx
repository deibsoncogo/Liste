import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './contexts/authContext'
import { Home } from './pages/home/home'
import './app.scss'

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} caseSensitive />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}
