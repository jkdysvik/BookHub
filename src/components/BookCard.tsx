import React from 'react';
import './BookCard.scss';
import { BookCardProps } from '../types/BookCardProps';

const BookCard = ({ title, author }: BookCardProps) => {
    return (
        <div className="book-card">
            <h2 className="book-card.title">{title}</h2>
            <p className="book-card.author">{author}</p>
        </div>
    );
};

export default BookCard