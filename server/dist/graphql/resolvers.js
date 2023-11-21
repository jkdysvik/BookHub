"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = __importDefault(require("../models/book"));
const review_1 = __importDefault(require("../models/review"));
const resolvers = {
    Query: {
        async books(_, { limit, offset, genre, orderBy }) {
            const query = {};
            if (genre) {
                query.genre = genre;
            }
            if (orderBy === 'rating') {
                const books = await book_1.default.find(query)
                    .skip(offset)
                    .limit(limit)
                    .sort({ rating: -1 });
                return books;
            }
            else if (orderBy === 'year') {
                const books = await book_1.default.find(query)
                    .skip(offset)
                    .limit(limit)
                    .sort({ year: -1 });
                return books;
            }
            else if (orderBy === 'author') {
                const books = await book_1.default.find(query)
                    .skip(offset)
                    .limit(limit)
                    .sort({ author: 1 });
                return books;
            }
            else if (orderBy === 'title') {
                const books = await book_1.default.find(query)
                    .skip(offset)
                    .limit(limit)
                    .sort({ title: 1 });
                return books;
            }
            else {
                const books = await book_1.default.find(query)
                    .skip(offset)
                    .limit(limit);
                return books;
            }
        },
        async book(_, { _id }) {
            return await book_1.default.findById(_id);
        },
        async bookReviews(_, { bookID }) {
            return await review_1.default.find({ bookID });
        },
    },
    Mutation: {
        async createBook(_, { input: { title, author, year, rating, genre, description, pages, language }, }) {
            const createdBook = new book_1.default({
                title,
                author,
                year,
                rating,
                genre,
                description,
                pages,
                language,
            });
            const res = await createdBook.save();
            return { id: res.id };
        },
        async updateBook(_, { ID, input: { title, author, year, rating, genre }, }) {
            const updatedBook = book_1.default.findByIdAndUpdate(ID, {
                title,
                author,
                year,
                rating,
                genre,
            });
            return updatedBook;
        },
        async deleteBook(_, { ID }) {
            const wasDeleted = await book_1.default.findById(ID).deleteOne();
            return wasDeleted;
        },
        async createReview(_, { input: { bookID, username, rating, review }, }) {
            const createdReview = new review_1.default({
                bookID,
                username,
                rating,
                review,
            });
            const res = await createdReview.save();
            return { id: res.id };
        }
    },
};
exports.default = resolvers;
