import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/HomePage.tsx'
import BookPage from './pages/BookPage.tsx'
import Navbar from './components/Navbar'
import SearchPage from './pages/SearchPage.tsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/project2/" element={<Homepage />} />
        <Route path="/project2/book/:bookId" element={<BookPage />} />
        <Route path="/project2/search/" element={<SearchPage/>} />
      </Routes>
    </>
  )
}

export default App
