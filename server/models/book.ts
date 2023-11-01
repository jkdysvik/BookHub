import mongoose from "mongoose";
import { BookType } from "../types";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  year: { type: Number, required: true, trim: true },
  rating: { type: Number, required: true, trim: true },
});

export default mongoose.model<BookType & mongoose.Document>("Book", bookSchema);