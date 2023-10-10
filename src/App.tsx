import { useState } from 'react'
import './App.css'
import BookCard from './components/BookCard'
import { BookCardProps } from './types/BookCardProps'

function App() {
  const [books, setBooks] = useState([{ title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954, rating: 4.5, genre: 'fantasy' },
  { title: 'Harry Potter', author: 'J.K. Rowling', year: 1997, rating: 4.8, genre: 'fantasy' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, rating: 5, genre: 'fantasy' },
  { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', year: 1943, rating: 4.3, genre: 'fiction' },
  { title: 'Dream of the Red Chamber', author: 'Cao Xueqin', year: 1791, rating: 4.1, genre: 'romance' },

  ])

  const orderBy = (property: keyof BookCardProps) => {
    const newBooks = [...books];
    newBooks.sort((a, b) => {
      const valueA = a[property]
      const valueB = b[property]
  
      if (valueA > valueB) {
        return 1;
      } else if (valueA < valueB) {
        return -1;
      } else {
        return 0;
      }
    });
  
    setBooks(newBooks);
  };

  const handleReverse = () => {
    const newBooks = [...books].reverse(); // Reverse the array
    setBooks(newBooks);
  };



  return (
    <>
    <select onChange={(e) => orderBy(e.target.value as keyof BookCardProps)}>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="rating">Rating</option>
        <option value="year">Year</option>
      </select>
      <button onClick={handleReverse}>Reverse</button>
      <div className="book-card-container">
        {books.map((book) => (<BookCard title={book.title} author={book.author} year={book.year} rating={book.rating} genre={book.genre} />))}
      </div>
    </>
  )
}

export default App
