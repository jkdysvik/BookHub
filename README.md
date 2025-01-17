# BookHub

## Introduction

Welcome to BookHub, a dynamic and user-friendly website designed for book enthusiasts. Our platform allows users to explore a vast collection of books, sort them by genre, and search for their favorite books with ease.

## Features

- **Book Exploration**: Browse a wide range of books.
- **Genre Sorting**: Filter books based on your preferred genres.
- **Search Functionality**: Find specific books using our search feature.
- **Reviews**: View reviews and add your own.
- **Readlist(under development)**: Add books to your own read list

## Getting Started

### Prerequisites

- Node.js
- MongoDB


### Installation

1. **Clone the Repository**
`git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-24/prosjekt-2.git`

2. **Install Dependencies**
- For Backend:
  ```
  cd server
  npm install
  ```
- For Frontend:
  ```
  cd client
  npm install
  ```

## Running the Application

1. **Start the server**
  ```
  cd server
  npm run dev:server
  ```
  After you recive this respond:
  >"Found 0 errors. Watching for file changes."
   
 you can stop the process and run the following:
  ```
  npm run start
  ```
2. **Launch the Frontend Application**
```
  cd client
  npm run dev
  ```
## Before creating a new merge request
Before creating a new merge request, the following commands should be run locally to verify that the application works:


`npm run build` - builds the application

`npm run lint` - checks for any bad code that potentially will cause errors

`npm run prettier` - formats the code


## Usage

The application should be running on http://localhost:5173/project2/

If you want to interact directly with the database, navigate to `http://localhost:4000`. Here you can test the queries and mutations.


## Testing

- **Component testing**: Testing for HomePage and BookPage
- **End 2 end**: End to end testing with playwright

Make sure the project is running locally, both server and client. Navigate to the client folder for the tests

To run the Component tests:
```
  npm run test:components
```
To run the end-2-end tests:
```
  npm run test:e2e

```

##Project structure

### Client

This folder contains all frontend code. It contains:


- Routes: containing all pages. Each page has a tsx file and a css file.

- Components: The different types of components are gathered in their own folder.

- Tests: containing snapshot tests and component tests.

- Hooks: Contains hooks used to connect the backend to the frontend

- Queries: Contains all queries we use to communicate with GraphQL


Frontend technologies


- Node.js

- Npm

- Vite

- React Typescript


### Server

This folder contains backend code. It contains the index.ts file that sets up the Apollo-server.

- [graphql]: contains resolvers.ts and typeDefs.ts.
- [models]: contains MongoDB schemas for books and reviews

## Technology Stack

### Backend

- **GraphQL**: A query language for our API, offering flexibility and efficiency in data operations.

- **Apollo Server**: open-source, spec-compliant GraphQL server

## Database

### Technologies

- MongoDB 
- Mongoose



### Frontend

- **React with Vite**: For a modern, fast, and reactive user interface.
- **Context API**: Used for managing the application state within React, ensuring efficient data handling.
- **TanStack Query**: A powerful, performant, and flexible fetching library for React, replacing Apollo Client. It manages server state, caching, synchronization, and more.

#Contributors

- Aksel Hodne Hanisch
- Jonathan Kvalvaag Dysvik
- Christian Li Sivertsen

