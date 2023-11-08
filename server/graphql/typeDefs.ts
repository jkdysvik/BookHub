const typeDefs = `#graphql
  type Book {
    _id: ID!
    title: String
    author: String
    year: Int
    rating: Float
    genre: String
  }
  input BookInput {
    title: String
    author: String
    year: Int
    rating: Float
    genre: String
  }

  type Query {
    books(limit: Int, offset: Int, genre: String): [Book]
    book(ID: ID!): Book!
    booksearch(title: String!): [Book]
  }

  type Mutation {
    createBook(input: BookInput): Book!
    updateBook(ID: ID!, input: BookInput): Book
    deleteBook(ID: ID!): Boolean
  }
`;

export default typeDefs;
