import './HomePage.scss';
import { useEffect, useState } from 'react';
import BookCard from '../../components/BookCard';
import { BookCardProps } from '../../types/BookCardProps';
import { useNavigate } from 'react-router';
import useGetBooks from '../../hooks/useGetBooks';
import { useSearch } from "../../hooks/searchContext";
import useGetSearchBooks from '../../hooks/useGetSearchBooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FrontPageLogo from './components/FrontPageLogo.tsx';
import Select from './components/Select.tsx';


function HomePage() {
    const navigate = useNavigate();

    const [chosenGenre, setChosenGenre] = useState<string>(sessionStorage.getItem('chosenGenre') ? sessionStorage.getItem('chosenGenre') as string : '');
    const [offset, setOffset] = useState<number>(sessionStorage.getItem('offset') ? parseInt(sessionStorage.getItem('offset') as string) : 0);
    const [chosenOrder, setChosenOrder] = useState<string>(sessionStorage.getItem('chosenOrder') ? sessionStorage.getItem('chosenOrder') as string : 'rating');
    const { searchQuery } = useSearch();
    const [limit, setLimit] = useState<number>(10);
    const [Logo, setLogo] = useState<number>(1);
    const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const { error, data, isLoading } = searchQuery
        ? useGetSearchBooks(searchQuery, offset, chosenGenre, chosenOrder, limit)
        : useGetBooks(offset, chosenGenre, chosenOrder, limit);


    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            const focusedElement = document.activeElement as HTMLElement;
            if (focusedElement) {
                focusedElement.click();
            }
        }
    };


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
        navigate('/project2/book/' + id);
    };

    const toggleLogo = () => {
        if (Logo === 4) {
            setLogo(1);
        }
        else
            setLogo(Logo + 1);
    }


    useEffect(() => {
        const handleResize = () => {
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            window.location.reload();
        };

        document.addEventListener('keydown', handleEnter);
        window.addEventListener('resize', handleResize);

        // Removes event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('keydown', handleEnter);
        };
    }, []);

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
        setLogo(0);
    }, [chosenGenre]);

    useEffect(() => {
        if (chosenOrder === sessionStorage.getItem('chosenOrder')) {
            console.log("order same")
            return;
        }
        sessionStorage.setItem('chosenOrder', chosenOrder);
        setOffset(0);
        setLogo(0);
    }, [chosenOrder]);

    useEffect(() => {
        if (searchQuery === sessionStorage.getItem('searchQuery')) {
            console.log("search same")
            return;
        }
        sessionStorage.setItem('searchQuery', searchQuery);

        setOffset(0);
        setLogo(0);
        console.log('Search query updated:', searchQuery);
        console.log(typeof searchQuery)
    }, [searchQuery]);

    useEffect(() => {
        if (viewportSize.width < 864) {
            setLimit(6);
        }
        else if (viewportSize.width < 1080 && viewportSize.width > 864) {
            setLimit(8);
        }
        else if (viewportSize.width > 1296 && viewportSize.width < 1512) {
            setLimit(12);
        }
        else if (viewportSize.width > 1512) {
            setLimit(14);
        } else {
            setLimit(10);
        }
    }, [viewportSize]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error {error.message}</p>;

    return (
        <>
            <div className="homepage-container">
                <FrontPageLogo toggleLogo={toggleLogo} logo_num={Logo} page={Math.floor(offset / limit)} />
                <Select chosenGenre={chosenGenre} onChange={selectGenre} type='genre' />
                <Select chosenOrder={chosenOrder} onChange={(e) => orderBy(e.target.value as keyof BookCardProps)} type='order' />
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
                <div className="homepage-scrolling-container">
                    {offset >= limit && (
                        <button className="homepage-scroll-button" onClick={() => setOffset(offset - limit)}><ArrowBackIcon fontSize='small' />Previous</button>
                    )}
                    <div className="homepage-index">{Math.floor(offset / limit)}</div>
                    {((data?.books && data.books.length === limit) || ((data as unknown as { searchBooks: BookCardProps[] }).searchBooks && (data as unknown as { searchBooks: BookCardProps[] }).searchBooks.length === limit)) && (
                        <button className="homepage-scroll-button" onClick={() => setOffset(offset + limit)}>
                            Next <ArrowForwardIcon fontSize='small' />
                        </button>
                    )}

                </div>
            </div>
        </>
    );
}

export default HomePage;