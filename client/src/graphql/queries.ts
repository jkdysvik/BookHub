import { gql } from 'graphql-request';


export const GET_BOOKS = gql`
  query GetBooksGenre($limit: Int, $offset: Int, $genre: String, $orderBy: String) {
    books(limit: $limit, offset: $offset, genre: $genre, orderBy: $orderBy) {
      title
      author
      year
      rating
      genre
    }
  }
`;