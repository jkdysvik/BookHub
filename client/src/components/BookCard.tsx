//import React from 'react';
import { AiFillStar } from 'react-icons/ai'
import './BookCard.scss';
import { BookCardProps } from '../types/BookCardProps';

const BookCard = ({ id, title, author, year, rating, genre, onClick }: BookCardProps) => {
    const handleClick = () => {
        onClick(id);
    };
    
    return (
        <div onClick={handleClick} className="book-card">
            <h2 className="book-card.title">{title}</h2>
            <div className="book-card.rating">{rating} <AiFillStar/></div>
            <p className="book-card.author">{author}</p>
            <p className="book-card.year">{year}</p>
            <p className="book-card.genre">{genre}</p>
        </div>
    );
};

export default BookCard