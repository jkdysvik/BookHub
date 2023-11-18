const typeDefs = `#graphql
  type Book {
    _id: ID!
    title: String
    author: String
    year: Int
    rating: Float
    genre: String
    description: String
    pages: Int
    language: String
  }
  input BookInput {
    title: String
    author: String
    year: Int
    rating: Float
    genre: String
    description: String
    pages: Int
    language: String
  }

  type Query {
    books(limit: Int, offset: Int, genre: String, orderBy: String): [Book]
    book(_id: ID!): Book!
    searchBooks(query: String, limit: Int): [Book]
  }

  type Mutation {
    createBook(input: BookInput): Book!
    updateBook(ID: ID!, input: BookInput): Book
    deleteBook(ID: ID!): Boolean
  }
`;

export default typeDefs;
