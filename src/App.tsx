import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/HomePage.tsx'
import BookPage from './pages/BookPage.tsx'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book/:book" element={<BookPage />} />
        <Route path="/search/:query" element={<Homepage/>} />
      </Routes>
    </>
  )
}

export default App
