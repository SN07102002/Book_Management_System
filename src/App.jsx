import { useState, useMemo } from "react";
import { useBooks } from "./hooks/useBooks";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import SearchBar from "./components/SearchBar";

export default function App() {
  const { books, loading, error, addBook, updateBook, deleteBook } = useBooks();

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Search & filter state
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  // ----- Filtered books -----
  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchSearch =
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.author?.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === "All" || b.genre === genre;
      return matchSearch && matchGenre;
    });
  }, [books, search, genre]);

  // ----- Handlers -----
  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleAdd = async (data) => {
    setActionLoading(true);
    const result = await addBook(data);
    setActionLoading(false);
    if (result.success) {
      setShowForm(false);
      showSuccess("Book added successfully! 🎉");
    }
    return result;
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleUpdate = async (data) => {
    setActionLoading(true);
    const result = await updateBook(editingBook.id, data);
    setActionLoading(false);
    if (result.success) {
      setShowForm(false);
      setEditingBook(null);
      showSuccess("Book updated successfully! ✅");
    }
    return result;
  };

  const handleDeleteConfirm = async () => {
    setActionLoading(true);
    const result = await deleteBook(deletingBook.id);
    setActionLoading(false);
    if (result.success) {
      setDeletingBook(null);
      showSuccess("Book deleted.");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HEADER ===== */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
                BookShelf
              </h1>
              <p className="text-xs text-gray-400">Book Management System</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingBook(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow transition"
          >
            <span className="text-base">＋</span>
            Add Book
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* ===== SUCCESS TOAST ===== */}
        {successMsg && (
          <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-800 text-sm rounded-xl font-medium animate-pulse">
            {successMsg}
          </div>
        )}

        {/* ===== ERROR BANNER ===== */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl font-medium">
            ⚠️ {error} — Please check your API URL in <code className="font-mono bg-red-100 px-1 rounded">src/services/api.js</code>
          </div>
        )}

        {/* ===== STATS BAR ===== */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 px-5 py-3 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Total Books</p>
            <p className="text-2xl font-extrabold text-indigo-600">{books.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 px-5 py-3 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Showing</p>
            <p className="text-2xl font-extrabold text-gray-800">{filtered.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 px-5 py-3 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Genres</p>
            <p className="text-2xl font-extrabold text-gray-800">
              {[...new Set(books.map((b) => b.genre).filter(Boolean))].length}
            </p>
          </div>
        </div>

        {/* ===== SEARCH & FILTER ===== */}
        <div className="mb-6">
          <SearchBar
            search={search}
            onSearch={setSearch}
            genre={genre}
            onGenre={setGenre}
          />
        </div>

        {/* ===== LOADING STATE ===== */}
        {loading && books.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading your library...</p>
          </div>
        )}

        {/* ===== EMPTY STATE ===== */}
        {!loading && books.length === 0 && !error && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No books yet!</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Start building your library by adding your first book.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition"
            >
              + Add Your First Book
            </button>
          </div>
        )}

        {/* ===== NO RESULTS STATE ===== */}
        {!loading && books.length > 0 && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-400 text-sm mb-4">
              Try adjusting your search or filter.
            </p>
            <button
              onClick={() => { setSearch(""); setGenre("All"); }}
              className="text-indigo-600 underline text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ===== BOOK GRID ===== */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEdit}
                onDelete={setDeletingBook}
              />
            ))}
          </div>
        )}
      </main>

      {/* ===== ADD / EDIT MODAL ===== */}
      {showForm && (
        <BookForm
          onSubmit={editingBook ? handleUpdate : handleAdd}
          onCancel={handleCloseForm}
          initialData={editingBook}
          loading={actionLoading}
        />
      )}

      {/* ===== DELETE CONFIRM MODAL ===== */}
      {deletingBook && (
        <DeleteConfirmModal
          book={deletingBook}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingBook(null)}
          loading={actionLoading}
        />
      )}
    </div>
  );
}