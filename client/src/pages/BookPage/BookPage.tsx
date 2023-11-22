import { useParams } from "react-router-dom";
import useGetBook from "../../hooks/useGetBook";
import "./BookPage.scss";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import StarIcon from '@mui/icons-material/Star';
import useGetReviews from "../../hooks/useGetReviews";
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { NewReviewProps } from "./types.ts";


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

  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data } = useGetBook(bookId);
  const { data: dataReviews } = useGetReviews(bookId);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState)
    const data: NewReviewProps = {
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
    <div>
      <div className="bookpage-container">
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
        <div id="reviewDiv">
          <h2>Reviews</h2>
          <div id="reviewList">
            {dataReviews?.bookReviews.map((review) => (
              <div className="review" key={review._id}>
                <p>Rating: {review.rating}<StarIcon style={{ fontSize: 'medium', marginLeft: '0px', color: '#35633b' }} /></p>
                Review: <div className="reviewText">{review.review}</div>
                <p>Reviewer: {review.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="addReview">
        <h2>Add review</h2>
        <form onSubmit={
          handleSubmit}>
          <label htmlFor="username">Username:  </label>
          <input type="text" name="username" id="username" value={formState.username} onChange={(e) => setFormState({ ...formState, username: e.target.value })} /> <p></p>
          <label htmlFor="rating">Rating:  </label>
          <input type="number" name="rating" id="rating" min="1" max="5" value={formState.rating} onChange={(e) => setFormState({ ...formState, rating: parseInt(e.target.value) })} /><p></p>
          <label htmlFor="review">Review:  </label>
          <textarea name="review" id="review" maxLength="100" cols="30" rows="5" value={formState.review} onChange={(e) => setFormState({ ...formState, review: e.target.value })}></textarea><p></p>
          <button type="submit" disabled={!formState.username.trim() || !formState.review.trim()} style={{
            backgroundColor: (!formState.username.trim() || !formState.review.trim()) ? '#ccc' : 'blue', // Example styling
            color: 'white',
          }}>Submit</button>

        </form>
      </div>
      {mutation.isError && <p>Error submitting review: {mutation.error.message}</p>}
    </div>
  );
}

export default BookPage;