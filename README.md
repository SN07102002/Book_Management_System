# 📚 BookShelf — Book Management System

A React-based Book Management System with full CRUD operations, search, filtering, and MockAPI integration.


## 🛠 Tech Stack
- **React 18** (Vite)
- **Tailwind CSS** for styling
- **MockAPI.io** for REST API
- **Vercel** for deployment

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/SN07102002/Book_Management_System.git
cd Book_Management_System
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up MockAPI
1. Go to [https://mockapi.io](https://mockapi.io) and sign up (free)
2. Create a new project (e.g., `BookManagement`)
3. Add a new resource called `books` with these fields:
   - `title` — String
   - `author` — String
   - `genre` — String
   - `publicationYear` — Number
4. Add some sample books
5. Copy your endpoint URL (looks like `https://XXXXX.mockapi.io/books`)

### 4. Configure the API URL
Open `src/services/api.js` and replace:
```js
const BASE_URL = "https://YOUR_PROJECT_ID.mockapi.io/books";
```
with your actual MockAPI URL.

### 5. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

---

## 📦 Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to Vercel

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: Vercel Dashboard
1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Click "New Project" → Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Your live URL is ready in ~1 minute!

---

## 📁 Project Structure

```
src/
├── components/
│   ├── BookCard.jsx        # Individual book card
│   ├── BookForm.jsx        # Add/Edit form modal
│   ├── DeleteConfirmModal.jsx  # Delete confirmation
│   └── SearchBar.jsx       # Search & genre filter
├── hooks/
│   └── useBooks.js         # Custom hook (CRUD + state)
├── services/
│   └── api.js              # All API calls
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
└── index.css               # Tailwind + global styles
```

---

## ✨ Features
- ✅ View all books in a responsive card grid
- ✅ Add new books via modal form
- ✅ Edit existing books
- ✅ Delete books with confirmation dialog
- ✅ Search by title or author
- ✅ Filter by genre
- ✅ Loading states & error handling
- ✅ Stats bar (total books, genres)
- ✅ Fully responsive design

---

## 👨‍💻 Author
Suvarna Najan — [GitHub](https://github.com/SN07102002)