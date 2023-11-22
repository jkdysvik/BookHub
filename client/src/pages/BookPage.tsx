import { useParams } from "react-router-dom";
import useGetBook from "../hooks/useGetBook";
import "./BookPage.scss";
import { useState } from "react";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import StarIcon from '@mui/icons-material/Star';

function BookPage() {
  const { bookId } = useParams();

  const { isLoading, error, data } = useGetBook(bookId);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book = data?.book;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      const focusedElement = document.activeElement as HTMLElement;
      if (focusedElement) {
        focusedElement.click();
      }
    }
  };

  return (
    <div className="bookPage-container">
      <button className="bookpage-bookmark-button">
        <BookmarkAddIcon />
      </button>
      <div className="bookPage-title">
        {book?.title}
      </div>
      <div className="bookpage-info-container">
        <div className="bookpage-info-field">
          <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Author:</div>
          <div style={{ marginLeft: '5px' }}>{book?.author}</div>
        </div>
        <div className="bookpage-info-field">
          <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Year:</div>
          <div style={{ marginLeft: '5px' }}>{book?.year}</div>
        </div>
        <div className="bookpage-info-field">
          <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Rating:</div>
          <div style={{ marginLeft: '5px' }}>{book?.rating}</div>
          <StarIcon style={{ fontSize: 'medium', marginLeft: '5px', color: '#35633b' }} />
        </div>
        <div className="bookpage-info-field">
          <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Genre:</div>
          <div style={{ marginLeft: '5px' }}>{book?.genre}</div>
        </div>
        {book?.pages && <div className="bookpage-info-field">
          <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Pages:</div>
          <div style={{ marginLeft: '5px' }}>{book?.pages}</div>
        </div>}
        {book?.language && <div className="bookpage-info-field">
          <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Language:</div>
          <div style={{ marginLeft: '5px' }}>{book?.language}</div>
        </div>}
      </div>
      <div style={{ fontWeight: 'bold', margin: '20px' }}>Description:</div>
      <p>
        {showFullDescription || (book?.description && book?.description.length < 400)
          ? book?.description
          : `${book?.description.substring(0, 400)}...`}
      </p>
      {
        book?.description && book.description.length > 400 && (
          <button className="bookpage-readmore-button"
            onClick={toggleDescription}
            onKeyDown={handleEnter}>
            {showFullDescription ? "Read Less" : "Read More"}
          </button>
        )
      }
    </div>
  );
}

export default BookPage;