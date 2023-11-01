const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    year: Int
    rating: Int
  }
  input BookInput {
    title: String
    author: String
    year: Int
    rating: Int
  }

  type Query {
    books: [Book]
    book(ID: ID!): Book!
  }

  type Mutation {
    createBook(input: BookInput): Book!
    updateBook(ID: ID!, input: BookInput): Book
    deleteBook(ID: ID!): Boolean
  }
`;

export default typeDefs;
