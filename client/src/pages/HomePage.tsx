import { useEffect, useState } from 'react';
import '../App.css';
import BookCard from '../components/BookCard';
import { BookCardProps } from '../types/BookCardProps';
import { useNavigate } from 'react-router';
import useGetBooks from '../hooks/useGetBooks';


function HomePage() {
    const navigate = useNavigate();



    const [chosenGenre, setChosenGenre] = useState<string>(sessionStorage.getItem('chosenGenre') ? sessionStorage.getItem('chosenGenre') as string : '');
    const [offset, setOffset] = useState<number>(sessionStorage.getItem('offset') ? parseInt(sessionStorage.getItem('offset') as string) : 0);
    const [chosenOrder, setChosenOrder] = useState<string>(sessionStorage.getItem('chosenOrder') ? sessionStorage.getItem('chosenOrder') as string : 'rating');


    // the useQuery hook is used to make a query to the backend
    const { error, data, isLoading } = useGetBooks(offset, chosenGenre, chosenOrder);
    


    const selectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
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

    useEffect(() => {
        sessionStorage.setItem('offset', offset.toString());
    }, [offset]);

    useEffect(() => {
        sessionStorage.setItem('chosenGenre', chosenGenre);
    }, [chosenGenre]);

    useEffect(() => {
        sessionStorage.setItem('chosenOrder', chosenOrder);
    }, [chosenOrder]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error {error.message}</p>;

    return (
        <>
            <div>
                <label htmlFor="genreSelect">Select genre:</label>
                <select value={chosenGenre} id="genreSelect" onChange={selectGenre}>
                    <option value="">All</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="History">History</option>
                    <option value="Historical Fiction">Historical fiction</option>
                    <option value="Science">Science</option>
                </select>
            </div>



            <div>
                <label htmlFor="orderBySelect">Order by:</label>
                <select value={chosenOrder} onChange={(e) => orderBy(e.target.value as keyof BookCardProps)}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="rating">Rating</option>
                    <option value="year">Year</option>
                </select>
            </div>
            <div className="book-card-container">
                {data?.books.map((book) => (<BookCard onClick={() => handleCardClick(book._id)} title={book.title} author={book.author} year={book.year} rating={book.rating} genre={book.genre} _id={book._id} description={book.description} pages={book.pages} language={book.language} />))}
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