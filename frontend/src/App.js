import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/books';

function App() {
  const [books, setBooks] = useState([]);

  // Fetch all books from the backend when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_URL);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Function to handle issuing or returning a book
  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'available' ? 'issued' : 'available';
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { status: newStatus });
      // Update the state on the frontend to reflect the change
      setBooks(books.map(book =>
        book.id === id ? { ...book, status: newStatus } : book
      ));
    } catch (error) {
      console.error("Error updating book status:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>📚 Mini Library</h1>
      <div className="book-list">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <div className={`status-indicator ${book.status}`}></div>
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </div>
            <div className="book-actions">
              <span className={`status-text ${book.status}`}>{book.status}</span>
              <button
                onClick={() => handleUpdateStatus(book.id, book.status)}
                className={`action-button ${book.status}`}
              >
                {book.status === 'available' ? 'Issue' : 'Return'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;