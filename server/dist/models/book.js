"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    year: { type: Number, required: true, trim: true },
    rating: { type: Number, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    pages: { type: Number, required: false, trim: true },
    language: { type: String, required: false, trim: true },
});
exports.default = mongoose_1.default.model("Book", bookSchema);
const Book = mongoose_1.default.model('Book', bookSchema);
module.exports = Book;
