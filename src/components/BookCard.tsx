import React from 'react';
import './BookCard.scss';
import { BookCardProps } from '../types/BookCardProps';

const BookCard = ({ title, author, year, rating }: BookCardProps) => {
    return (
        <div className="book-card">
            <h2 className="book-card.title">{title}</h2>
            <div className="book-card.rating">{rating} </div>
            <p className="book-card.author">{author}</p>
            <p className="book-card.year">{year}</p>
        </div>
    );
};

export default BookCard