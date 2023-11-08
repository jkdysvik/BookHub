import { useParams } from "react-router-dom";
import useGetBook from "../hooks/useGetBook";


function BookPage() {
  const { bookId } = useParams(); // Ensure this matches the URL parameter
  console.log(bookId)
  console.log(typeof bookId)

  const { isLoading, error, data } = useGetBook(bookId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const book = data?.book;

  return (
    <div>
      <h1>{book?.title}</h1>
      <div id="bokinfo">
        <p>Author: {book?.author}</p>
        <p>Year: {book?.year}</p>
        <p>Rating: {book?.rating}</p>
        <p>Genre: {book?.genre}</p>
      </div>
    </div>

  );
}

export default BookPage;
