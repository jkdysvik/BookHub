import { useState } from 'react';
import '../App.css';
import BookCard from '../components/BookCard';
import { BookCardProps } from '../types/BookCardProps';
import { useNavigate } from 'react-router';
import useGetBooks from '../hooks/useGetBooks';



interface Book extends BookCardProps {
    onClick: (id: string) => void;
}

function HomePage() {
    const navigate = useNavigate();



    const [books, setBooks] = useState<Book[]>([]);
    const [chosenGenre, setChosenGenre] = useState<string>('');



    const { error, data, isLoading } = useGetBooks(chosenGenre);

    // set the books state to the data returned from the query  


    const selectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const genre = e.target.value;
        if (genre === 'all') {
            // setBooks(data.books);
        } else {
            // const newBooks = data.books.filter((book: { genre: string; }) => book.genre.toLowerCase() === genre);
            // setBooks(newBooks);
            setChosenGenre(genre);
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

    const handleCardClick = (id: string) => {
        console.log(id);
        navigate('/project2/book/' + id);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error {error.message}</p>;

    return (
        <>
            <div>
                <label htmlFor="genreSelect">Select genre:</label>
                <select id="genreSelect" onChange={selectGenre}>
                    <option value="">All</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Romance">Romance</option>
                </select>
            </div>
            <div onClick={() => console.log(data)}>asdfasdfasdfasdfasdf</div>
            <div onClick={() => console.log(chosenGenre)}>print genre</div>



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
                {data?.books.map((book) => (<BookCard onClick={handleCardClick} title={book.title} author={book.author} year={book.year} rating={book.rating} genre={book.genre} />))}
            </div>
        </>
    );
}

export default HomePage;