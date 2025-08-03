const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allows requests from the React frontend
app.use(express.json()); // Parses incoming JSON requests

// In-memory data store (our "database")
let books = [
  { id: 1, title: '1984', author: 'George Orwell', status: 'available' },
  { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'available' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'issued' },
  { id: 4, title: 'Dune', author: 'Frank Herbert', status: 'available' },
  { id: 5, title: 'Brave New World', author: 'Aldous Huxley', status: 'issued' },
];

// --- API Endpoints ---

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// PATCH (update) a book's status
app.patch('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { status } = req.body; // Expecting { "status": "issued" } or { "status": "available" }

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (status !== 'available' && status !== 'issued') {
    return res.status(400).json({ message: 'Invalid status' });
  }

  // Update the book's status
  books[bookIndex].status = status;

  console.log(`Updated book ${bookId} to status: ${status}`);
  res.json(books[bookIndex]); // Return the updated book
});


app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});