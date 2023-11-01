import Book from "../models/book";
import { CreateBookInput } from "../types";

const resolvers = {
  Query: {
    // returns all books
    async books() {
      return await Book.find();
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
        input: { title, author, year, rating },
      }: { input: CreateBookInput }
    ) {
      const createdBook = new Book({
        title,
        author,
        year,
        rating,
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
        input: { title, author, year, rating },
      }: { ID: String; input: CreateBookInput }
    ) {
      const updatedBook = Book.findByIdAndUpdate(ID, {
        title,
        author,
        year,
        rating,
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
