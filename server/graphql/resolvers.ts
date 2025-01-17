import Book from "../models/book";
import Review from "../models/review";
import { CreateBookInput, CreateBookReviewInput } from "../types";
const resolvers = {
  Query: {
    async books(_: any, { limit, offset, genre, orderBy }: { limit: number, offset: number, genre: string, orderBy: string }) {
      const query: any = {};
      if (genre) {
        query.genre = genre;
      }
      if (orderBy === 'rating') {
        const books = await Book.find(query)
          .skip(offset) // Offset specifies how many documents to skip
          .limit(limit)
          .sort({ rating: -1 }); // Limit specifies the maximum number of documents to return
        return books;
      }
      else if (orderBy === 'year') {
        const books = await Book.find(query)
          .skip(offset) // Offset specifies how many documents to skip
          .limit(limit)
          .sort({ year: -1 }); // Limit specifies the maximum number of documents to return
        return books;
      }
      else if (orderBy === 'author') {
        const books = await Book.find(query)
          .skip(offset) // Offset specifies how many documents to skip
          .limit(limit)
          .sort({ author: 1 }); // Limit specifies the maximum number of documents to return
        return books;
      }
      else if (orderBy === 'title') {
        const books = await Book.find(query)
          .skip(offset) // Offset specifies how many documents to skip
          .limit(limit)
          .sort({ title: 1 }); // Limit specifies the maximum number of documents to return
        return books;
      }
      else {
        const books = await Book.find(query)
          .skip(offset) // Offset specifies how many documents to skip
          .limit(limit); // Limit specifies the maximum number of documents to return
        return books;
      }
    },
    // returns a book by ID
    async book(_: any, { _id }: { _id: string }) {
      return await Book.findById(_id);
    },
    async searchBooks(_: any, { query, limit, offset, genre, orderBy }: { query: string, limit: number, offset: number, genre: string, orderBy: string }) {
      const regSearch = new RegExp(query, 'i');
  
      // Books that start with the query
      const regStart = new RegExp('^' + query, 'i');

      const match: any = {
        $or: [
          { title: { $regex: regSearch } },
          { author: { $regex: regSearch } },
        ],
      };
  
      // Conditionally add the genre filter if it's not an empty string
      if (genre && genre.trim() !== '') {
         match.genre = { $eq: genre };
      }

      // Sorts with the books that start with the query first
      const books = await Book.aggregate([
        {
          $match: match,
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
            ...(orderBy === 'title' ? { startsWith: -1 } : {}),
            [orderBy]: orderBy === 'rating' || orderBy === 'year' ? -1 : 1,
          },
        },
        { $skip: offset },
        { $limit: limit },
      ]);

      return books;
    },

    async bookReviews(_: any, { bookID }: { bookID: string }) {
      return await Review.find({ bookID });
    },
  },
  Mutation: {
    // creates a new book
    async createBook(
      _: any,
      {
        input: { title, author, year, rating, genre, description, pages, language },
      }: { input: CreateBookInput }
    ) {
      const createdBook = new Book({
        title,
        author,
        year,
        rating,
        genre,
        description,
        pages,
        language,
      });
      // save the book to the database
      const res = await createdBook.save();
      return { id: res.id };
    },
    // updates a book by ID
    async updateBook(
      _: any,
      {
        ID,
        input: { title, author, year, rating, genre },
      }: { ID: String; input: CreateBookInput }
    ) {
      const updatedBook = Book.findByIdAndUpdate(ID, {
        title,
        author,
        year,
        rating,
        genre,
      });
      return updatedBook;
    },
    // deletes a book by ID
    async deleteBook(_: any, { ID }: { ID: string }) {
      const wasDeleted = await Book.findById(ID).deleteOne();
      return wasDeleted;
    },
    // creates review for a book
    async createReview(
      _:any,
      {
        input: { bookID, username, rating, review },
      } : { input: CreateBookReviewInput }
    ) { 
      const createdReview = new Review({
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
export default resolvers;
