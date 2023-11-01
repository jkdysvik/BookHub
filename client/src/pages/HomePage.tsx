import { useState } from 'react';
import '../App.css';
import BookCard from '../components/BookCard';
import { BookCardProps } from '../types/BookCardProps';
import { useNavigate } from 'react-router';
import { gql, useQuery } from '@apollo/client';

// the query to get all books
const BOOKS = gql`
    query GetBooks {
        books {
        title
        author
        year
        rating
        }
    }
    `;

interface Book extends BookCardProps {
    onClick: (title: string) => void;
}

function HomePage() {
    const navigate = useNavigate();

    const handleSearch = (query: string) => {
        console.log(query);
    };


    const initialBooks: Book[] = [
        { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954, rating: 4.5, genre: 'fantasy', onClick: () => {} },
        { title: 'Harry Potter', author: 'J.K. Rowling', year: 1997, rating: 4.8, genre: 'fantasy', onClick: () => {} },
        { title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, rating: 5, genre: 'fantasy', onClick: () => {} },
        { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', year: 1943, rating: 4.3, genre: 'fiction', onClick: () => {} },
        { title: 'Dream of the Red Chamber', author: 'Cao Xueqin', year: 1791, rating: 4.1, genre: 'romance', onClick: () => {} }
    ];

    const [books, setBooks] = useState(initialBooks);


    // the useQuery hook is used to make a query to the backend
    const { loading, error, data } = useQuery(BOOKS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    console.log(data.books);

    const bookys = data.books.map(({ title, author, year, rating }: Book) => (
        <div key={title}>
          <p>
            {title}: {author} ({year}) {rating}
          </p>
        </div>
      ));

    const selectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const genre = e.target.value;
        if (genre === 'all') {
            setBooks(initialBooks);
        } else {
            const newBooks = initialBooks.filter((book) => book.genre === genre);
            setBooks(newBooks);
        }
    };

    const orderBy = (property: keyof BookCardProps) => {
        const newBooks = [...books];

        newBooks.sort((a, b) => {
            const valueA = a[property];
            const valueB = b[property];

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

    const handleCardClick = (title: string) => {
        navigate('/book/' + title);
    };

    return (
        <>
            <div>
                <label htmlFor="genreSelect">Select genre:</label>
                <select id="genreSelect" onChange={selectGenre}>
                    <option value="all">All</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="fiction">Fiction</option>
                    <option value="romance">Romance</option>
                </select>
            </div>
            <div>
                <label htmlFor="orderBySelect">Order by:</label>
                <select onChange={(e) => orderBy(e.target.value as keyof BookCardProps)}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="rating">Rating</option>
                    <option value="year">Year</option>
                </select>
            </div>
            <button onClick={handleReverse}>Reverse</button>
            <div className="book-card-container">
                {books.map((book) => (<BookCard onClick={handleCardClick} title={book.title} author={book.author} year={book.year} rating={book.rating} genre={book.genre} />))}
                <div> { bookys } </div>
            </div>
        </>
    );
}

export default HomePage;