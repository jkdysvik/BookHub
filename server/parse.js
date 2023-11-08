// import mongoose from "mongoose";
const mongoose = require('mongoose');
// const BookType = require('types');
// import { BookType } from "../types";
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  year: { type: Number, required: true, trim: true },
  rating: { type: Number, required: true, trim: true },
  genre: { type: String, required: true, trim: true },
});
// export default mongoose.model<BookType & mongoose.Document>("Book", bookSchema);
// For the parsing
const Book = mongoose.model('Book', bookSchema);
const fs = require('fs');
const csv = require('csv-parser');
// const mongoose = require('mongoose');
// const Book = require('../models/book');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BookDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Read data from CSV file
fs.createReadStream('books.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Transform and insert data into the database
    const date = row.publishDate.split(" ");
    let year = date[date.length - 1];
    // if (year.length != 4) {
    // }
    console.log(year.length);
    console.log(year);
    const genres = row.genres.replace(/'/g, '"');
    const genresArray = JSON.parse(genres);
    const genre = genresArray[0]
    const bookData = {
      title: row.title,
      author: row.author,
      year: parseInt(year),
      rating: parseFloat(row.rating),
      genre: genre
    };
    async function InsertBook() {
      try {
        await Book.create(bookData);
        console.log("inserted");
      }
      catch (err) {
        console.log(err);
      }
    }
    if (year.length == 4) {
      InsertBook();
    }
    // InsertBook();
  })
  .on('end', () => {
    console.log('CSV file successfully processed and data inserted into the database.');
    mongoose.connection.close(); // Close the database connection
  });