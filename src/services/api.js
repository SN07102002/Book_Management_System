

const BASE_URL = "https://6a15d68e91ff9a63de08e054.mockapi.io/books";

export const bookService = {
  // GET all books
  async getAll() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch books");
    return res.json();
  },

  // GET single book
  async getById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch book");
    return res.json();
  },

  // POST new book
  async create(book) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error("Failed to create book");
    return res.json();
  },

  // PUT update book
  async update(id, book) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error("Failed to update book");
    return res.json();
  },

  // DELETE book
  async delete(id) {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete book");
    return res.json();
  },
};