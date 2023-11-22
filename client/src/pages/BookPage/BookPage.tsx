import { useParams } from "react-router-dom";
import useGetBook from "../../hooks/useGetBook";
import "./BookPage.scss";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import StarIcon from '@mui/icons-material/Star';
import useGetReviews from "../../hooks/useGetReviews";
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import ReviewList from "./components/ReviewList";
import NewReviewForm from "./components/NewReviewForm";
import { NewReviewProps } from "./types";

interface NewReview {
  bookID: string;
  username: string;
  rating: number;
  review: string;
}




function BookPage() {
  const { bookId } = useParams(); // Ensure this matches the URL parameter
  const createReviewMutation = async (newReview: NewReviewProps) => {
    const query = `
      mutation CreateReview($createReviewInput: ReviewInput) {
        createReview(input: $createReviewInput) {
          bookID
          username
          rating
          review
          _id
        }
      }
    `;

    const response = await fetch("http://localhost:4000/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          createReviewInput: newReview,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create review');
    }

    return response.json();
  };
  const mutation = useMutation(createReviewMutation);

  const [formState, setFormState] = useState<NewReviewProps>({
    bookID: bookId || '',
    username: '',
    rating: 0,
    review: '',
  });

  const updateFormState = (newFormState: NewReviewProps) => {
    setFormState(newFormState);
  }

  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data } = useGetBook(bookId);
  const { data: dataReviews } = useGetReviews(bookId);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState)
    const data: NewReview = {
      bookID: bookId || '',
      username: formState.username,
      rating: formState.rating,
      review: formState.review,
    };
    createReviewMutation(data)
      .then(response => {
        console.log('Mutation successful:', response);
        window.location.reload();
      })
      .catch(error => {
        console.error('Mutation failed:', error);
      });



  };
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
    <div className="bookpage-container">
      <div className="bookpage-book-container">
        <button className="bookpage-bookmark-button">
          <BookmarkAddIcon />
        </button>
        <div className="bookpage-title">
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
      <ReviewList reviews={dataReviews} />
      <NewReviewForm onSubmit={handleSubmit} updateFormState={updateFormState} />
    </div>
  );
}

export default BookPage;
