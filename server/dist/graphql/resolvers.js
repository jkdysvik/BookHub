"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = __importDefault(require("../models/book"));
const resolvers = {
    Query: {
        async books(_, { limit, offset, genre }) {
            const query = {};
            if (genre) {
                query.genre = genre;
            }
            const books = await book_1.default.find(query)
                .skip(offset)
                .limit(limit);
            return books;
        },
        async book(_, { ID }) {
            return await book_1.default.findById(ID);
        },
    },
    Mutation: {
        async createBook(_, { input: { title, author, year, rating, genre }, }) {
            const createdBook = new book_1.default({
                title,
                author,
                year,
                rating,
                genre,
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
    },
};
exports.default = resolvers;
