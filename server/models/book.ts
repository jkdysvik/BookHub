import mongoose from "mongoose";
import { BookType } from "../types";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  year: { type: Number, required: true, trim: true },
  rating: { type: Number, required: true, trim: true },
  genre: { type: String, required: true, trim: true },
  description: { type: String, required: false, trim: true },
  pages: { type: Number, required: false, trim: true },
  language: { type: String, required: false, trim: true },
});

export default mongoose.model<BookType & mongoose.Document>("Book", bookSchema);

// For the parsing
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

