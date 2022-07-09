import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home/home'
import './app.scss'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} caseSensitive />
      </Routes>
    </BrowserRouter>
  )
}
