# BookHub

## Introduction

Welcome to BookHub, a dynamic and user-friendly website designed for book enthusiasts. Our platform allows users to explore a vast collection of books, sort them by genre, and search for their favorite titles with ease.

## Features

- **Book Exploration**: Browse a wide range of books.
- **Genre Sorting**: Filter books based on your preferred genres.
- **Search Functionality**: Find specific books using our search feature.

## Technology Stack

### Backend

- **MongoDB**: Our database choice for efficient data storage and retrieval.
- **GraphQL**: A query language for our API, offering flexibility and efficiency in data operations.
- **Apollo Server**: An open-source GraphQL server that integrates seamlessly with MongoDB and GraphQL, providing a robust backend structure.

### Frontend

- **React with Vite**: For a modern, fast, and reactive user interface.
- **Context API**: Used for managing the application state within React, ensuring efficient data handling.
- **Apollo Client**: Integrated with React to manage both local and remote data with GraphQL.

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
  cd backend
  npm install
  ```
- For Frontend:
  ```
  cd frontend
  npm install
  ```

### Running the Application

1. **Start the Backend Server**
  ```
  cd backend
  npm install
  npm run build:server
  npm run start
  ```
2. **Launch the Frontend Application**
```
  cd frontend
  npm install
  npm run dev
  ```

## Usage

Once the application is running, navigate to `http://localhost:4000` in your browser to start exploring the book collection.

