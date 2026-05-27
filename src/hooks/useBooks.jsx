import { useState, useEffect, useCallback } from "react";
import { bookService } from "../services/api";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getAll();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = async (book) => {
    setLoading(true);
    setError(null);
    try {
      const newBook = await bookService.create(book);
      setBooks((prev) => [...prev, newBook]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (id, book) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await bookService.update(id, book);
      setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await bookService.delete(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
  };
}