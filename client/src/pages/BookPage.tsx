import { useParams } from "react-router-dom";
import useGetBook from "../hooks/useGetBook";
import useGetReviews from "../hooks/useGetReviews";
//import  useCreateReview from "../hooks/useCreateReview";
import { useState } from "react";
import { request, gql } from 'graphql-request';
import { useMutation } from '@tanstack/react-query';
//import { Mutation } from '@apollo/react-components';

interface NewReview {
  bookID: string;
  username: string;
  rating: number;
  review: string;
}




function BookPage() {
  

  // const [createReview] = useMutation(CREATE_REVIEW,
  //   {
  //     createReviewInput: {
  //       bookID: bookId,
  //       username: username,
  //       rating: rating,
  //       review: review,
  //     },
  //   });
  
  
  const { bookId } = useParams(); // Ensure this matches the URL parameter
  const createReviewMutation = async (newReview: NewReview) => {
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
        // Include any additional headers like authentication tokens here
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

  const [formState, setFormState] = useState<NewReview>({
    bookID: bookId || '',
    username: '',
    rating: 0,
    review: '',
  });


  //const { isLoading, error, data } = useGetBook(bookId);
  const { data } = useGetBook(bookId);
  //const { isLoading: isLoadingReviews, error: errorReviews, data: dataReviews } = useGetReviews(bookId);
 // if (isLoadingReviews) return <p>Loading...</p>;
  //if (errorReviews) return <p>Error :</p>;

  //if (isLoading) return <p>Loading...</p>;
  //if (error) return <p>Error :</p>;
  console.log(typeof(bookId))
  const { data: dataReviews } = useGetReviews(bookId);
  // if (reviewIsLoading) return <p>Loading...</p>;
  // if (reviewError) return <p>Error :</p>;

  console.log(dataReviews)
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState)
    const data : NewReview = {
      bookID: bookId || '',
      username: formState.username,
      rating: formState.rating,
      review: formState.review,
    };
    createReviewMutation(data)
    .then(response => {
      console.log('Mutation successful:', response);
    })
    .catch(error => {
      console.error('Mutation failed:', error);
    });

    
    
  };
  // const testReviewData: NewReview = {
  //   bookID: 'testBookID', // Replace with a valid test bookID
  //   username: 'testUser',
  //   rating: 5,
  //   review: 'This is a test review',
  // };

  // // Call the function directly for testing
  // createReviewMutation(testReviewData)
  //   .then(response => {
  //     console.log('Mutation successful:', response);
  //   })
  //   .catch(error => {
  //     console.error('Mutation failed:', error);
  //   });


  const book = data?.book;
  //const review = dataReviews?.reviews;
  return (
    <div>
      <h1>{book?.title}</h1>
      <div id="bokinfo">
        <p>Author: {book?.author}</p>
        <p>Year: {book?.year}</p>
        <p>Rating: {book?.rating}</p>
        <p>Genre: {book?.genre}</p>
        {book?.description && <p>Description: {book?.description}</p>}
        {book?.pages && <p>Pages: {book?.pages}</p>}
        {book?.language && <p>Language: {book?.language}</p>}
      </div>
      <div id="reviewDiv">
        <h2>Reviews</h2>
        <div id="reviewList">
          {dataReviews?.bookReviews.map((review) => (
            <div className="review" key={review._id}>
              <p>Rating: {review.rating}</p>
              <p>Review: {review.review}</p>
              <p>Reviewer: {review.username}</p>
            </div>
          ))}
        </div>
        <div id="addReview">
          <h2>Add review</h2>
          <form onSubmit={
            handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={formState.username} onChange={(e) => setFormState({...formState, username : e.target.value})} />
            <label htmlFor="rating">Rating</label>
            <input type="number" name="rating" id="rating" min="1" max="5" value={formState.rating} onChange={(e) => setFormState({...formState, rating : parseInt(e.target.value)})}/>
            <label htmlFor="review">Review</label>
            <textarea name="review" id="review" cols="30" rows="10" value={formState.review} onChange={(e) => setFormState({...formState, review : e.target.value})}></textarea>
            <button type="submit">Submit</button>
          </form>
          </div>
        {mutation.isError && <p>Error submitting review: {mutation.error.message}</p>}
      </div>
    </div>

  );
}

export default BookPage;
