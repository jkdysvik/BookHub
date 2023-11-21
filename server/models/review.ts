import mongoose from "mongoose";
import { ReviewType } from "../types";

const reviewSchema = new mongoose.Schema({
    bookID: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, trim: true },
    review: { type: String, required: false, trim: true },
});

export default mongoose.model<ReviewType & mongoose.Document>("Review", reviewSchema);

// For the parsing
const Book = mongoose.model('Review', reviewSchema);
module.exports = Book;

