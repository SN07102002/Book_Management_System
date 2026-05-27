const GENRE_COLORS = {
  Fiction: "bg-blue-100 text-blue-700",
  "Non-Fiction": "bg-green-100 text-green-700",
  "Science Fiction": "bg-purple-100 text-purple-700",
  Fantasy: "bg-pink-100 text-pink-700",
  Mystery: "bg-yellow-100 text-yellow-700",
  Thriller: "bg-red-100 text-red-700",
  Romance: "bg-rose-100 text-rose-700",
  Biography: "bg-teal-100 text-teal-700",
  History: "bg-orange-100 text-orange-700",
  "Self-Help": "bg-lime-100 text-lime-700",
  Horror: "bg-slate-100 text-slate-700",
  Other: "bg-gray-100 text-gray-700",
};

export default function BookCard({ book, onEdit, onDelete }) {
  const genreClass =
    GENRE_COLORS[book.genre] || "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Top color strip based on genre */}
      <div className="h-1.5 rounded-t-2xl bg-indigo-500" />

      <div className="p-5 flex flex-col flex-1">
        {/* Genre badge */}
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit mb-3 ${genreClass}`}
        >
          {book.genre}
        </span>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 leading-snug mb-1 line-clamp-2">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-500 mb-1">by {book.author}</p>

        {/* Year */}
        <p className="text-xs text-gray-400 mb-4">{book.publicationYear}</p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <button
            onClick={() => onEdit(book)}
            className="flex-1 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 py-2 rounded-xl transition-colors"
          >
            ✎ Edit
          </button>
          <button
            onClick={() => onDelete(book)}
            className="flex-1 text-sm font-semibold text-red-500 hover:bg-red-50 py-2 rounded-xl transition-colors"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}