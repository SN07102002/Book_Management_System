import { useState, useEffect } from "react";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Biography",
  "History",
  "Self-Help",
  "Horror",
  "Other",
];

const EMPTY_FORM = {
  title: "",
  author: "",
  genre: "",
  publicationYear: "",
};

export default function BookForm({ onSubmit, onCancel, initialData, loading }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        author: initialData.author || "",
        genre: initialData.genre || "",
        publicationYear: initialData.publicationYear || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.genre) newErrors.genre = "Genre is required";
    if (!form.publicationYear) {
      newErrors.publicationYear = "Year is required";
    } else if (
      isNaN(form.publicationYear) ||
      form.publicationYear < 1000 ||
      form.publicationYear > new Date().getFullYear()
    ) {
      newErrors.publicationYear = `Enter a valid year (1000–${new Date().getFullYear()})`;
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const result = await onSubmit({
      ...form,
      publicationYear: parseInt(form.publicationYear),
    });
    if (result?.success) {
      setForm(EMPTY_FORM);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Book" : "Add New Book"}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. The Great Gatsby"
              className={`w-full px-4 py-2.5 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.title ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Author *
            </label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="e.g. F. Scott Fitzgerald"
              className={`w-full px-4 py-2.5 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.author ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
              }`}
            />
            {errors.author && (
              <p className="text-red-500 text-xs mt-1">{errors.author}</p>
            )}
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Genre *
            </label>
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-xl border text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.genre ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
              }`}
            >
              <option value="">Select a genre</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="text-red-500 text-xs mt-1">{errors.genre}</p>
            )}
          </div>

          {/* Publication Year */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Publication Year *
            </label>
            <input
              type="number"
              name="publicationYear"
              value={form.publicationYear}
              onChange={handleChange}
              placeholder={`e.g. ${new Date().getFullYear()}`}
              min="1000"
              max={new Date().getFullYear()}
              className={`w-full px-4 py-2.5 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.publicationYear ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
              }`}
            />
            {errors.publicationYear && (
              <p className="text-red-500 text-xs mt-1">{errors.publicationYear}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : null}
              {initialData ? "Save Changes" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}