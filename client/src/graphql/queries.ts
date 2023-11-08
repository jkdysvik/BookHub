import { gql } from 'graphql-request';


export const GET_BOOKS = gql`
  query GetBooksGenre($limit: Int, $offset: Int, $genre: String) {
    books(limit: $limit, offset: $offset, genre: $genre) {
      title
      author
      year
      rating
      genre
    }
  }
`;