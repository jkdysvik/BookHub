import { useEffect, useState } from 'react';
import '../App.css';
import BookCard from '../components/BookCard';
import { BookCardProps } from '../types/BookCardProps';
import { useNavigate } from 'react-router';
import useGetBooks from '../hooks/useGetBooks';
import { useSearch } from "../hooks/searchContext";
import useGetSearchBooks from '../hooks/useGetSearchBooks';


function HomePage() {
    const navigate = useNavigate();


    const [chosenGenre, setChosenGenre] = useState<string>(sessionStorage.getItem('chosenGenre') ? sessionStorage.getItem('chosenGenre') as string : '');
    const [offset, setOffset] = useState<number>(sessionStorage.getItem('offset') ? parseInt(sessionStorage.getItem('offset') as string) : 0);
    const [chosenOrder, setChosenOrder] = useState<string>(sessionStorage.getItem('chosenOrder') ? sessionStorage.getItem('chosenOrder') as string : 'rating');
    const { searchQuery } = useSearch();

    const { error, data, isLoading } = searchQuery
        ? useGetSearchBooks(searchQuery, offset, chosenGenre, chosenOrder)
        : useGetBooks(offset, chosenGenre, chosenOrder);


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
        if (chosenGenre === sessionStorage.getItem('chosenGenre')) {
            console.log("genre same")
            return;
        }
        sessionStorage.setItem('chosenGenre', chosenGenre);
        setOffset(0);
    }, [chosenGenre]);

    useEffect(() => {
        if (chosenOrder === sessionStorage.getItem('chosenOrder')) {
            console.log("order same")
            return;
        }
        sessionStorage.setItem('chosenOrder', chosenOrder);
        setOffset(0);
    }, [chosenOrder]);

    useEffect(() => {
        if (searchQuery === sessionStorage.getItem('searchQuery')) {
            console.log("search same")
            return;
        }  
        sessionStorage.setItem('searchQuery', searchQuery);

        setOffset(0);
        console.log('Search query updated:', searchQuery);
        console.log(typeof searchQuery)
      }, [searchQuery]);


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
                {(searchQuery
                    ? (data as unknown as { searchBooks: BookCardProps[] }).searchBooks
                    : (data?.books as BookCardProps[])
                )?.map((book) => (
                    <BookCard
                    onClick={() => handleCardClick(book._id)}
                    title={book.title}
                    author={book.author}
                    year={book.year}
                    rating={book.rating}
                    genre={book.genre}
                    _id={book._id}
                    description={book.description}
                    pages={book.pages}
                    language={book.language}
                    />
                ))}
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