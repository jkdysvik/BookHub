import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookCard from './components/BookCard'

function App() {
  const [books, setBooks] = useState([{ title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954, rating: 4.5 },
  { title: 'Harry Potter', author: 'J.K. Rowling', year: 1997, rating: 4.8 },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, rating: 4.2 },
  { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', year: 1943, rating: 4.3 },
  { title: 'Dream of the Red Chamber', author: 'Cao Xueqin', year: 1791, rating: 4.1 },

  ])



  return (
    <>
      <div className="book-card-container">
        {books.map((book) => (<BookCard title={book.title} author={book.author} year={book.year} rating={book.rating} />))}
      </div>
    </>
  )
}

export default App
