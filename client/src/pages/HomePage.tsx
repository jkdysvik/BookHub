import { useState } from 'react';
import '../App.css';
import BookCard from '../components/BookCard';
import { BookCardProps } from '../types/BookCardProps';
import { useNavigate } from 'react-router';
import useGetBooks from '../hooks/useGetBooks';


function HomePage() {
    const navigate = useNavigate();



    const [chosenGenre, setChosenGenre] = useState<string>('');
    const [offset, setOffset] = useState<number>(0);
    const [chosenOrder, setChosenOrder] = useState<string>('title');



    const { error, data, isLoading } = useGetBooks(offset, chosenGenre, chosenOrder);

    // set the books state to the data returned from the query  


    const selectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const genre = e.target.value;
        if (genre === 'All') {
            setChosenGenre('');
        } else {
            setChosenGenre(genre);
        }
    };

    const orderBy = (property: keyof BookCardProps) => {
        setChosenOrder(property);
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



            <div>
                <label htmlFor="orderBySelect">Order by:</label>
                <select onChange={(e) => orderBy(e.target.value as keyof BookCardProps)}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="rating">Rating</option>
                    <option value="year">Year</option>
                </select>
            </div>
            <div className="book-card-container">
                {data?.books.map((book) => (<BookCard onClick={() => handleCardClick(book._id)} title={book.title} author={book.author} year={book.year} rating={book.rating} genre={book.genre} _id={book._id} />))}
            </div>
            <div className='scrolling-container'>
                {offset >= 10 && (
                    <button onClick={() => setOffset(offset - 10)}>Previous</button>
                )}
                <button onClick={() => setOffset(offset + 10)}>Next</button>
            </div>
        </>
    );
}

export default HomePage;