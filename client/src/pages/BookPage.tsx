import { useParams } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

const GET_BOOK_BY_ID = gql`
  query Book($id: ID!) {
    book(ID: $id) {
      _id  
      title
      author
      year
      rating
      genre
    }
  }
`;

function BookPage() {
  const { bookId } = useParams(); // Ensure this matches the URL parameter
  console.log(bookId)
  console.log(typeof bookId)

  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id: bookId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const book = data.book;

  return (
    <div>
        <h1>{book.title}</h1>
        <div id="bokinfo">
            <p>Author: {book.author}</p>
            <p>Year: {book.year}</p>
            <p>Rating: {book.rating}</p>
            <p>Genre: {book.genre}</p>
            </div>
    </div>

  );
}

export default BookPage;
