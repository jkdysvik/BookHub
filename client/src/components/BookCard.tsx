//import React from 'react';
import { AiFillStar } from 'react-icons/ai'
import './BookCard.scss';
import { BookCardProps } from '../types/BookCardProps';

const BookCard = ({ _id, title, author, year, rating, genre, onClick }: BookCardProps) => {
    const handleClick = () => {
        onClick(_id);
    };
    
    if(title.length > 20){
        title = title.substring(0,20) + '...';
    }
    if(author.length > 20){
        author = author.substring(0,20) + '...';
    }
    return (
        
        <div onClick={handleClick} className="book-card">
            <div className="title-div">
                <h2 className="book-card.title">{title}</h2>
            </div>
            <div className="book-card.rating">{rating} <AiFillStar/></div>
            <div className="author-div">   
                <p className="book-card.author">{author}</p>
            </div>
            <p className="book-card.year">{year}</p>
            <p className="book-card.genre">{genre}</p>
        </div>
    );
};

export default BookCard