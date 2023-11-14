import { gql } from 'graphql-request';


export const GET_BOOKS = gql`
  query GetBooksGenre($limit: Int, $offset: Int, $genre: String, $orderBy: String) {    
    books(limit: $limit, offset: $offset, genre: $genre, orderBy: $orderBy) {
      _id
      title
      author
      year
      rating
      genre
    }
  }
`;

export const GET_BOOK = gql`
  query Book($id: ID!) {
    book(_id: $id) {
      _id  
      title
      author
      year
      rating
      genre
      description
      pages
      language
    }
  }
`;