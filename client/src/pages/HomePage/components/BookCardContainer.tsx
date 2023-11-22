import { FC } from "react";
import { BookCardContainerProps } from "../types.ts";
import BookCard from "../../../components/BookCard.tsx";
import "../HomePage.scss";

const BookCardContainer: FC<BookCardContainerProps> = ({
  books,
  handleCardClick,
}) => {
  return (
    <div className="book-card-container">
      {books.map((book) => (
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
  );
};

export default BookCardContainer;
