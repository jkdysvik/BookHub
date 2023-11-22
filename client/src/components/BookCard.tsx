//import React from 'react';
import StarIcon from "@mui/icons-material/Star";
import "./BookCard.scss";
import { BookCardProps } from "../types/BookCardProps";

const BookCard = ({
  _id,
  title,
  author,
  year,
  rating,
  genre,
  onClick,
}: BookCardProps) => {
  const handleClick = () => {
    onClick(_id);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  if (title.length > 20) {
    title = title.substring(0, 20) + "...";
  }
  if (author.length > 20) {
    author = author.substring(0, 20) + "...";
  }
  return (
    <div
      className="book-card"
      onClick={handleClick}
      onKeyDown={handleEnter}
      tabIndex={0}
    >
      <div className="title-div">
        <h2 data-testid="book-card-title" className="book-card-title">
          {title}
        </h2>
      </div>
      <div className="book-card-rating">
        {rating}
        <StarIcon
          style={{ fontSize: "large", marginLeft: "5px", color: "#35633b" }}
        />
      </div>
      <div className="author-div">
        <p className="book-card-author">{author}</p>
      </div>
      <div className="info-div">
        <p className="book-card.year">{year}</p>
        <p className="book-card.genre">{genre}</p>
      </div>
    </div>
  );
};

export default BookCard;
