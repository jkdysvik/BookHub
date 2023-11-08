const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Book = require('./models/book');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BookDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Read data from CSV file
fs.createReadStream('books.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Transform and insert data into the database
    const date = row.publishDate.split(" ");
    let year = date[date.length - 1];
    if (year.length != 4) {
      year = 0;
    }
    console.log(year.length);
    console.log(year);

    const genres = row.genres.replace(/'/g, '"');
    const genresArray = JSON.parse(genres);
    const genre = genresArray[0]

    const bookData = {
      title: row.title,
      author: row.author,
      year: parseInt(year),
      rating: parseFloat(row.rating),
      genre: genre
    };
  
    async function InsertBook() {
      try { 
        await Book.create(bookData);
        console.log("inserted");
      }
      catch (err) {
        console.log(err);
      }

    }
    InsertBook();

  })
  .on('end', () => {
    console.log('CSV file successfully processed and data inserted into the database.');
    mongoose.connection.close(); // Close the database connection
  });

  