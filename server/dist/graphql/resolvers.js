"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = __importDefault(require("../models/book"));
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
        async searchBooks(_, { query, limit }) {
            const regSearch = new RegExp(query, 'i');
            const regStart = new RegExp('^' + query, 'i');
            const books = await book_1.default.aggregate([
                {
                    $match: {
                        $or: [
                            { title: { $regex: regSearch } },
                            { author: { $regex: regSearch } },
                        ],
                    },
                },
                {
                    $addFields: {
                        startsWith: {
                            $cond: [
                                { $or: [{ $regexMatch: { input: '$title', regex: regStart } },
                                        { $regexMatch: { input: '$author', regex: regStart } }] },
                                1,
                                0,
                            ],
                        },
                    },
                },
                {
                    $sort: {
                        startsWith: -1,
                        title: 1,
                    },
                },
                { $limit: limit },
            ]);
            return books;
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
    },
};
exports.default = resolvers;
