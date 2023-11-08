import Book from "../models/book";
import { CreateBookInput } from "../types";

const resolvers = {
  Query: {
    async books(_: any, { limit, offset, genre, orderBy }: { limit: number, offset: number, genre: string, orderBy: string }) {
      const query: any = {};
      if (genre) {
        query.genre = genre;
      }
      if (orderBy==='rating') {
        const books = await Book.find(query)
        .skip(offset) // Offset specifies how many documents to skip
        .limit(limit)
        .sort({ rating: -1 }); // Limit specifies the maximum number of documents to return
      return books;
      }
      else if (orderBy==='year') {
        const books = await Book.find(query)
        .skip(offset) // Offset specifies how many documents to skip
        .limit(limit)
        .sort({ year: -1 }); // Limit specifies the maximum number of documents to return
      return books;
      }
      else if (orderBy==='author') {
        const books = await Book.find(query)
        .skip(offset) // Offset specifies how many documents to skip
        .limit(limit)
        .sort({ author: 1 }); // Limit specifies the maximum number of documents to return
      return books;
      }
      else if (orderBy==='title') {
        const books = await Book.find(query)
        .skip(offset) // Offset specifies how many documents to skip
        .limit(limit)
        .sort({ title: 1 }); // Limit specifies the maximum number of documents to return
      return books;
      }
      else{
        const books = await Book.find(query)
        .skip(offset) // Offset specifies how many documents to skip
        .limit(limit); // Limit specifies the maximum number of documents to return
      return books;
      }
    },
    // returns a book by ID
    async book(_: any, { ID }: { ID: string }) {
      return await Book.findById(ID);
    },
  },
  Mutation: {
    // creates a new book
    async createBook(
      _: any,
      {
        input: { title, author, year, rating, genre },
      }: { input: CreateBookInput }
    ) {
      const createdBook = new Book({
        title,
        author,
        year,
        rating,
        genre,
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
  },
};

export default resolvers;
