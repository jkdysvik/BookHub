import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookCard from './components/BookCard'

function App() {
  const [books, setBooks] = useState([{ title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
  { title: 'Harry Potter', author: 'J.K. Rowling' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
  { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry' },
  { title: 'Dream of the Red Chamber', author: 'Cao Xueqin' },  

  ])



  return (
    <>
      <div className="book-card-container">
        {books.map((book) => (<BookCard title={book.title} author={book.author} />))}
      </div>
    </>
  )
}

export default App
